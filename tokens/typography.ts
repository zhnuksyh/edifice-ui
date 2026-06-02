/**
 * Typography tokens for Edifice.
 *
 * `fontFamily` exposes font stacks as arrays so they can be spread into
 * Tailwind's `fontFamily` config directly.
 * `fontSize` values are in rem for accessible, scalable type.
 */
export const typography = {
  fontFamily: {
    // Display / headings
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    // Body copy
    body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    // Code / monospaced
    mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
    '6xl': '3.75rem', // 60px
  },

  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  letterSpacing: {
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
  },
} as const

export type Typography = typeof typography
export type FontSize = keyof Typography['fontSize']
export type FontWeight = keyof Typography['fontWeight']
