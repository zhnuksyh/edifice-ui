import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'
import type { Preset } from './types'

/**
 * Dark preset — the balanced Edifice look.
 *
 * grey[11] background, grey[1A] surface, yellow accent, Montserrat display +
 * Poppins body, lg radius, normal density.
 */
export const defaultPreset: Preset = {
  name: 'Dark',
  description: 'Balanced dark UI with a warm yellow accent.',
  colors: {
    background: colors.grey['11'],
    surface: colors.grey['1A'],
    elevated: colors.grey['22'],
    border: colors.grey['2A'],
    accent: 'yellow',
    accentColor: colors.yellow.DEFAULT,
    text: colors.grey.F0,
    secondaryText: colors.grey.AA,
  },
  fonts: {
    display: typography.fontFamily.display[0],
    body: typography.fontFamily.body[0],
  },
  radius: 'lg',
  density: 'normal',
}
