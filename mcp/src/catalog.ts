/**
 * Static description of the Edifice library's structure.
 *
 * Declared once here so every tool, resource, and the filesystem layer agree on
 * what categories exist and where files live. Update this when the library's
 * top-level shape changes.
 */

export type Platform = 'web' | 'mobile'

/** Component categories available per platform. */
export const COMPONENT_CATEGORIES: Record<Platform, readonly string[]> = {
  web: ['layout', 'ui', 'forms', 'marketing', 'data-display'],
  mobile: ['layout', 'ui', 'forms', 'data-display'],
}

/** Token groups, each backed by `tokens/<group>.ts`. */
export const TOKEN_GROUPS = [
  'colors',
  'typography',
  'spacing',
  'radius',
  'shadows',
  'animation',
] as const

export type TokenGroup = (typeof TOKEN_GROUPS)[number]

/**
 * Flat directories that hold one file per item. `ext` is the source extension,
 * `kind` is the label used in search results and listings.
 */
export const FLAT_DIRS = {
  hooks: { dir: 'hooks', ext: '.ts', kind: 'hook' },
  utils: { dir: 'utils', ext: '.ts', kind: 'util' },
  prompts: { dir: 'prompts', ext: '.md', kind: 'prompt' },
  docs: { dir: 'architecture', ext: '.md', kind: 'doc' },
} as const

export type FlatDirKey = keyof typeof FLAT_DIRS

/** The component file extension for a given platform. */
export function componentExt(platform: Platform): string {
  return platform === 'mobile' ? '.native.tsx' : '.tsx'
}
