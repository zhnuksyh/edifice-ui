/**
 * Color tokens for Edifice.
 *
 * The system is grey-first: a 12-step greyscale carries the entire UI, with
 * five accent colors used sparingly (never dominant). Each accent pairs a
 * vivid `DEFAULT` with a dark `tint` for subtle backgrounds on dark surfaces.
 *
 * Grey keys are the hex byte (e.g. '11' → #111111, '1A' → #1A1A1A), kept as
 * strings so they survive as Tailwind class fragments: `bg-grey-11`,
 * `text-grey-F0`, etc.
 *
 * Semantic colors map onto the accents.
 */
export const colors = {
  // Greys — the primary palette (lightest value is the deepest background).
  grey: {
    '0A': '#0A0A0A', // deepest background
    '11': '#111111', // primary background
    '1A': '#1A1A1A', // surface / cards
    '22': '#222222', // elevated surface
    '2A': '#2A2A2A', // borders
    '33': '#333333', // subtle borders
    '44': '#444444', // muted elements
    '66': '#666666', // placeholder text
    '88': '#888888', // secondary text
    AA: '#AAAAAA', // tertiary text
    CC: '#CCCCCC', // disabled text
    F0: '#F0F0F0', // primary text
  },

  // Accents — minimal use only, never dominant. tint = dark background wash.
  yellow: { DEFAULT: '#E8C547', tint: '#2A2418' },
  red: { DEFAULT: '#E8474C', tint: '#2A1215' },
  cyan: { DEFAULT: '#00BCD4', tint: '#001E24' },
  green: { DEFAULT: '#4ADE80', tint: '#052E16' },
  purple: { DEFAULT: '#A855F7', tint: '#1E0A2E' },

  // Semantic — map to accents.
  success: { DEFAULT: '#4ADE80', tint: '#052E16' }, // green
  danger: { DEFAULT: '#E8474C', tint: '#2A1215' }, // red
  warning: { DEFAULT: '#E8C547', tint: '#2A2418' }, // yellow
  info: { DEFAULT: '#00BCD4', tint: '#001E24' }, // cyan
} as const

export type Colors = typeof colors
export type Grey = keyof Colors['grey']
export type Accent = 'yellow' | 'red' | 'cyan' | 'green' | 'purple'
export type Semantic = 'success' | 'danger' | 'warning' | 'info'
