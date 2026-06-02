/**
 * Border-radius tokens for Edifice.
 *
 * `full` is a large fixed value used for pills and circles.
 */
export const radius = {
  sm: '2px',
  md: '6px',
  lg: '10px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const

export type Radius = typeof radius
export type RadiusKey = keyof Radius
