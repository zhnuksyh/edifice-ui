/** Helpers shared by the tool modules. */
import type { Bundle } from '../library.js'

/** Wrap a string as a single-text-block MCP tool result. */
export function text(value: string) {
  return { content: [{ type: 'text' as const, text: value }] }
}

/** Render a resolved bundle as labeled file blocks + an install footer. */
export function renderBundle(bundle: Bundle): string {
  const header = `// Bundle for ${bundle.entry} — ${bundle.files.length} file(s)`
  const blocks = bundle.files.map((f) => `// ${f.path}\n\n${f.source}`)

  const footer: string[] = []
  if (bundle.peerDeps.length > 0) {
    footer.push(
      `// Peer dependencies to install:\nnpm install ${bundle.peerDeps.join(' ')}`
    )
  }
  if (bundle.externalDeps.length > 0) {
    footer.push(
      `// Also imported (likely already present): ${bundle.externalDeps.join(', ')}`
    )
  }

  return [header, ...blocks, ...footer].join('\n\n')
}
