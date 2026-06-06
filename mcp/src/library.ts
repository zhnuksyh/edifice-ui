/**
 * Filesystem layer for the Edifice MCP server.
 *
 * Locates the library repo root and provides read/list/search helpers over it.
 * Every tool and resource goes through this module so file IO and the
 * path-traversal guards live in exactly one place.
 */
import { readFile, readdir, access } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, relative, basename, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  COMPONENT_CATEGORIES,
  FLAT_DIRS,
  TOKEN_GROUPS,
  componentExt,
  type FlatDirKey,
  type Platform,
  type TokenGroup,
} from './catalog.js'

/** A located component file. */
export interface ComponentEntry {
  name: string
  platform: Platform
  category: string
  /** Path relative to the repo root, e.g. `components/web/ui/Button.tsx`. */
  path: string
}

/** A search hit. */
export interface SearchHit {
  path: string
  kind: string
  /** A short matching snippet (single line, trimmed). */
  snippet: string
}

/**
 * Resolve the Edifice repo root.
 *
 * Honors `EDIFICE_ROOT` if set; otherwise walks up from this module's location
 * until it finds a directory containing both `tokens/` and `components/`. Works
 * whether running from `mcp/src` (tsx) or `mcp/dist` (built).
 */
function resolveRoot(): string {
  const override = process.env.EDIFICE_ROOT
  if (override) {
    const abs = resolve(override)
    if (isLibraryRoot(abs)) return abs
    throw new Error(
      `EDIFICE_ROOT=${override} does not look like the Edifice repo (missing tokens/ or components/).`
    )
  }

  let dir = fileURLToPath(new URL('.', import.meta.url))
  // Walk up to the filesystem root looking for the library markers.
  for (let i = 0; i < 10; i++) {
    if (isLibraryRoot(dir)) return dir
    const parent = resolve(dir, '..')
    if (parent === dir) break
    dir = parent
  }
  throw new Error(
    'Could not locate the Edifice repo root. Set EDIFICE_ROOT to the repo path.'
  )
}

function isLibraryRoot(dir: string): boolean {
  return existsSync(join(dir, 'tokens')) && existsSync(join(dir, 'components'))
}

const ROOT = resolveRoot()

/** Validate a single path segment (a file/component name). */
function assertSafeName(name: string): void {
  if (
    !name ||
    name.includes('/') ||
    name.includes('\\') ||
    name.includes('..') ||
    name.includes('\0')
  ) {
    throw new SafeNameError(name)
  }
}

/** Thrown for names that fail the traversal guard. Tools turn this into a message. */
export class SafeNameError extends Error {
  constructor(public readonly name: string) {
    super(`Invalid name: ${JSON.stringify(name)}`)
    this.name = 'SafeNameError'
  }
}

/** Resolve a repo-relative path and assert it stays inside the repo root. */
function safeResolve(relPath: string): string {
  const abs = resolve(ROOT, relPath)
  const rel = relative(ROOT, abs)
  if (rel.startsWith('..') || rel.startsWith(sep) || resolve(ROOT, rel) !== abs) {
    throw new SafeNameError(relPath)
  }
  return abs
}

async function readRepoFile(relPath: string): Promise<string> {
  return readFile(safeResolve(relPath), 'utf8')
}

async function fileExists(relPath: string): Promise<boolean> {
  try {
    await access(safeResolve(relPath))
    return true
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// Components
// ---------------------------------------------------------------------------

/** List components, optionally filtered by platform and/or category. */
export async function listComponents(
  platform?: Platform,
  category?: string
): Promise<ComponentEntry[]> {
  const platforms: Platform[] = platform ? [platform] : ['web', 'mobile']
  const entries: ComponentEntry[] = []

  for (const p of platforms) {
    const categories = category
      ? COMPONENT_CATEGORIES[p].includes(category)
        ? [category]
        : []
      : COMPONENT_CATEGORIES[p]
    const ext = componentExt(p)

    for (const cat of categories) {
      const relDir = join('components', p, cat)
      let files: string[]
      try {
        files = await readdir(safeResolve(relDir))
      } catch {
        continue
      }
      for (const file of files) {
        if (!file.endsWith(ext)) continue
        entries.push({
          name: basename(file, ext),
          platform: p,
          category: cat,
          path: join(relDir, file).split(sep).join('/'),
        })
      }
    }
  }

  return entries.sort((a, b) => a.path.localeCompare(b.path))
}

/** Read a component's source. Returns null if not found. */
export async function readComponent(
  platform: Platform,
  name: string
): Promise<{ path: string; source: string } | null> {
  assertSafeName(name)
  const ext = componentExt(platform)
  for (const cat of COMPONENT_CATEGORIES[platform]) {
    const relPath = join('components', platform, cat, `${name}${ext}`)
    if (await fileExists(relPath)) {
      return {
        path: relPath.split(sep).join('/'),
        source: await readRepoFile(relPath),
      }
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Dependency resolution (components, hooks, utils)
// ---------------------------------------------------------------------------

/** A file in a resolved bundle. */
export interface BundleFile {
  /** Repo-relative path, e.g. `utils/cn.ts`. */
  path: string
  source: string
}

/** An entry file plus the full local dependency graph it needs to be copied in. */
export interface Bundle {
  /** The entry file's repo-relative path. */
  entry: string
  /** Entry file first, then every transitive local file it imports (deduped). */
  files: BundleFile[]
  /** Bare import specifiers that are declared in the repo's peerDependencies. */
  peerDeps: string[]
  /** Bare import specifiers not in peerDependencies (e.g. `react`). */
  externalDeps: string[]
}

/** Extensions to probe when resolving a relative import with no/implicit extension. */
const RESOLVE_EXTS = ['.ts', '.tsx']

/**
 * Extract the module specifiers from a TypeScript source's import/export-from
 * statements. Covers `import … from 'x'`, `export … from 'x'`, type-only forms,
 * and bare side-effect `import 'x'`. A focused regex (not the TS compiler) keeps
 * the server dependency-free; the library's imports are all standard ES syntax.
 */
function parseImportSpecifiers(source: string): string[] {
  const specs = new Set<string>()
  // `import …from 'x'` / `export …from 'x'` (the `…from` covers default, named,
  // namespace, and type-only clauses alike).
  const fromRe = /(?:import|export)\b[^'"]*?\bfrom\s*['"]([^'"]+)['"]/g
  // Bare `import 'x'` side-effect imports (no `from`).
  const bareRe = /import\s*['"]([^'"]+)['"]/g
  for (const m of source.matchAll(fromRe)) specs.add(m[1])
  for (const m of source.matchAll(bareRe)) specs.add(m[1])
  return [...specs]
}

/** True for a relative specifier (`./x`, `../x`). */
function isRelative(spec: string): boolean {
  return spec.startsWith('./') || spec.startsWith('../')
}

/**
 * Resolve a relative import specifier (from the importing file) to a real
 * repo-relative file path, or null if it does not resolve to a repo file.
 * Tries the literal path, then `.ts`/`.tsx`, then `/index.ts(x)`.
 */
async function resolveRelative(
  fromFile: string,
  spec: string
): Promise<string | null> {
  const fromDir = join(fromFile, '..')
  const base = join(fromDir, spec)
  const candidates = [
    base,
    ...RESOLVE_EXTS.map((e) => base + e),
    ...RESOLVE_EXTS.map((e) => join(base, `index${e}`)),
  ]
  for (const cand of candidates) {
    const rel = cand.split(sep).join('/')
    // Skip bare extensionless dirs; only count real files.
    if (rel.endsWith('.ts') || rel.endsWith('.tsx')) {
      if (await fileExists(rel)) return rel
    }
  }
  return null
}

/** Read the repo's declared peerDependencies (names only). Empty on any error. */
async function readPeerDepNames(): Promise<Set<string>> {
  try {
    const pkg = JSON.parse(await readRepoFile('package.json')) as {
      peerDependencies?: Record<string, string>
    }
    return new Set(Object.keys(pkg.peerDependencies ?? {}))
  } catch {
    return new Set()
  }
}

/**
 * Resolve an entry file and the full local dependency graph it imports, plus the
 * bare (peer/external) specifiers a consumer must install.
 *
 * Derived from the actual import statements — never a hand-maintained manifest —
 * so it cannot drift from the source. Shared by every `*Bundle` resolver.
 */
async function resolveBundleFrom(entry: {
  path: string
  source: string
}): Promise<Bundle> {
  const peerNames = await readPeerDepNames()
  const files: BundleFile[] = []
  const visited = new Set<string>()
  const peerDeps = new Set<string>()
  const externalDeps = new Set<string>()

  // Depth-first walk over local files, classifying every import specifier.
  const walkFile = async (file: BundleFile): Promise<void> => {
    if (visited.has(file.path)) return
    visited.add(file.path)
    files.push(file)

    for (const spec of parseImportSpecifiers(file.source)) {
      if (isRelative(spec)) {
        const rel = await resolveRelative(file.path, spec)
        if (rel && !visited.has(rel)) {
          await walkFile({ path: rel, source: await readRepoFile(rel) })
        }
        continue
      }
      // Bare specifier: peer dep if declared, otherwise external.
      // Normalize scoped/subpath specifiers to the package name.
      const pkgName = spec.startsWith('@')
        ? spec.split('/').slice(0, 2).join('/')
        : spec.split('/')[0]
      if (peerNames.has(pkgName)) peerDeps.add(pkgName)
      else externalDeps.add(pkgName)
    }
  }

  await walkFile({ path: entry.path, source: entry.source })

  return {
    entry: entry.path,
    files,
    peerDeps: [...peerDeps].sort(),
    externalDeps: [...externalDeps].sort(),
  }
}

/**
 * Resolve a component plus its full local dependency graph. Returns null if the
 * component is not found.
 */
export async function resolveComponentBundle(
  platform: Platform,
  name: string
): Promise<Bundle | null> {
  const entry = await readComponent(platform, name)
  if (!entry) return null
  return resolveBundleFrom(entry)
}

/**
 * Resolve a flat-dir item (hook or util) plus its full local dependency graph.
 * Returns null if the item is not found.
 */
export async function resolveFlatItemBundle(
  key: FlatDirKey,
  name: string
): Promise<Bundle | null> {
  const entry = await readFlatItem(key, name)
  if (!entry) return null
  return resolveBundleFrom(entry)
}

// ---------------------------------------------------------------------------
// Tokens
// ---------------------------------------------------------------------------

export function listTokenGroups(): readonly TokenGroup[] {
  return TOKEN_GROUPS
}

export async function readTokenGroup(
  group: string
): Promise<{ path: string; source: string } | null> {
  assertSafeName(group)
  if (!TOKEN_GROUPS.includes(group as TokenGroup)) return null
  const relPath = join('tokens', `${group}.ts`)
  return { path: `tokens/${group}.ts`, source: await readRepoFile(relPath) }
}

// ---------------------------------------------------------------------------
// Flat dirs (hooks, utils, prompts, docs)
// ---------------------------------------------------------------------------

/** List the item names in a flat directory (hooks, utils, prompts, docs). */
export async function listFlatDir(key: FlatDirKey): Promise<string[]> {
  const { dir, ext } = FLAT_DIRS[key]
  let files: string[]
  try {
    files = await readdir(safeResolve(dir))
  } catch {
    return []
  }
  return files
    .filter((f) => f.endsWith(ext))
    .map((f) => basename(f, ext))
    .sort((a, b) => a.localeCompare(b))
}

/** Read one item from a flat directory. Returns null if not found. */
export async function readFlatItem(
  key: FlatDirKey,
  name: string
): Promise<{ path: string; source: string } | null> {
  assertSafeName(name)
  const { dir, ext } = FLAT_DIRS[key]
  // Allow callers to pass either bare name or name-with-extension.
  const bare = name.endsWith(ext) ? basename(name, ext) : name
  const relPath = join(dir, `${bare}${ext}`)
  if (!(await fileExists(relPath))) return null
  return {
    path: relPath.split(sep).join('/'),
    source: await readRepoFile(relPath),
  }
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

const SEARCH_DIRS: Array<{ dir: string; kind: string }> = [
  { dir: 'tokens', kind: 'token' },
  { dir: 'components', kind: 'component' },
  { dir: 'hooks', kind: 'hook' },
  { dir: 'utils', kind: 'util' },
  { dir: 'prompts', kind: 'prompt' },
  { dir: 'architecture', kind: 'doc' },
]

const SEARCHABLE_EXT = ['.ts', '.tsx', '.md']
const MAX_RESULTS = 20

/**
 * Substring-search the library by file name and contents.
 *
 * Case-insensitive. Name matches rank above content matches. Returns at most
 * {@link MAX_RESULTS} hits, each with a short snippet.
 */
export async function searchLibrary(query: string): Promise<SearchHit[]> {
  const needle = query.trim().toLowerCase()
  if (!needle) return []

  const nameHits: SearchHit[] = []
  const contentHits: SearchHit[] = []

  for (const { dir, kind } of SEARCH_DIRS) {
    for await (const relPath of walk(dir)) {
      if (!SEARCHABLE_EXT.some((e) => relPath.endsWith(e))) continue
      const display = relPath.split(sep).join('/')

      if (basename(relPath).toLowerCase().includes(needle)) {
        nameHits.push({ path: display, kind, snippet: '(name match)' })
        continue
      }

      const source = await readRepoFile(relPath)
      const line = source
        .split('\n')
        .find((l) => l.toLowerCase().includes(needle))
      if (line) {
        contentHits.push({
          path: display,
          kind,
          snippet: line.trim().slice(0, 120),
        })
      }
    }
  }

  return [...nameHits, ...contentHits].slice(0, MAX_RESULTS)
}

/** Recursively yield repo-relative file paths under a directory. */
async function* walk(relDir: string): AsyncGenerator<string> {
  let dirents
  try {
    dirents = await readdir(safeResolve(relDir), { withFileTypes: true })
  } catch {
    return
  }
  for (const dirent of dirents) {
    const child = join(relDir, dirent.name)
    if (dirent.isDirectory()) {
      yield* walk(child)
    } else if (dirent.isFile()) {
      yield child
    }
  }
}

export { ROOT }
