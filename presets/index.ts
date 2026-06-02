/**
 * Edifice presets — named token bundles defining a "look".
 *
 * Re-exports each preset plus the shared Preset type and a convenience array.
 *
 *   import { defaultPreset, futuristicPreset, friendlyPreset } from './presets'
 */
export type { Preset } from './types'

export { defaultPreset } from './default'
export { futuristicPreset } from './futuristic'
export { friendlyPreset } from './friendly'

import { defaultPreset } from './default'
import { futuristicPreset } from './futuristic'
import { friendlyPreset } from './friendly'

/** All presets in display order. */
export const presets = [defaultPreset, futuristicPreset, friendlyPreset] as const
