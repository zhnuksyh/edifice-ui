import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'
import type { Preset } from './types'

/**
 * Void preset — deeper, sharper, cooler.
 *
 * grey[0A] background, grey[11] surface, cyan accent, Montserrat display +
 * Poppins body, md radius (sharper feel), normal density.
 */
export const futuristicPreset: Preset = {
  name: 'Void',
  description: 'Deep near-black UI with a cyan accent and sharper corners.',
  colors: {
    background: colors.grey['0A'],
    surface: colors.grey['11'],
    elevated: colors.grey['1A'],
    border: colors.grey['22'],
    accent: 'cyan',
    accentColor: colors.cyan.DEFAULT,
    text: colors.grey.F0,
    secondaryText: colors.grey.AA,
  },
  fonts: {
    display: typography.fontFamily.display[0],
    body: typography.fontFamily.body[0],
  },
  radius: 'md',
  density: 'normal',
}
