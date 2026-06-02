/**
 * Edifice presets — named token bundles defining a "look".
 *
 * Re-exports each preset plus the shared Preset type and a convenience array.
 *
 *   import { defaultPreset, futuristicPreset, obsidianPreset } from './presets'
 */
export type { Preset } from './types'

export { defaultPreset } from './default'
export { futuristicPreset } from './futuristic'
export { obsidianPreset } from './obsidian'

import { defaultPreset } from './default'
import { futuristicPreset } from './futuristic'
import { obsidianPreset } from './obsidian'

/** All presets in display order. */
export const presets = [defaultPreset, futuristicPreset, obsidianPreset] as const
