/**
 * Edifice design tokens — single entry point.
 *
 * Re-exports every token group (and its types) as named exports so consumers
 * can do:
 *   import { colors, spacing, typography, type Colors } from './tokens'
 */
export { colors } from './colors'
export type { Colors, ColorScale, SemanticColor } from './colors'

export { typography } from './typography'
export type { Typography, FontSize, FontWeight } from './typography'

export { spacing } from './spacing'
export type { Spacing, SpacingKey } from './spacing'

export { radius } from './radius'
export type { Radius, RadiusKey } from './radius'

export { shadows } from './shadows'
export type { Shadows, ShadowKey } from './shadows'

export { animation } from './animation'
export type { Animation, Easing, Duration } from './animation'
