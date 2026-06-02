import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'
import type { Preset } from './types'

/**
 * Friendly preset — softer, rounder, more spacious.
 *
 * grey[1A] background, grey[22] surface, yellow accent, Fredoka display +
 * Poppins body, xl radius, spacious density.
 */
export const friendlyPreset: Preset = {
  name: 'friendly',
  description: 'Lighter dark UI with rounded Fredoka headings and roomy spacing.',
  colors: {
    background: colors.grey['1A'],
    surface: colors.grey['22'],
    accent: 'yellow',
    accentColor: colors.yellow.DEFAULT,
    text: colors.grey.F0,
  },
  fonts: {
    display: typography.fontFamily.rounded[0],
    body: typography.fontFamily.body[0],
  },
  radius: 'xl',
  density: 'spacious',
}
