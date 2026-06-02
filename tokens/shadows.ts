/**
 * Box-shadow tokens for Edifice.
 *
 * Dark-aware: tuned for dark surfaces with deeper, higher-opacity shadows so
 * elevation reads on near-black backgrounds.
 */
export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.4)',
  md: '0 4px 12px rgba(0,0,0,0.5)',
  lg: '0 8px 24px rgba(0,0,0,0.6)',
  xl: '0 16px 40px rgba(0,0,0,0.7)',
} as const

export type Shadows = typeof shadows
export type ShadowKey = keyof Shadows
