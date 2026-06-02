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
