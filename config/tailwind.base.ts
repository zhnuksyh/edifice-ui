import type { Config } from 'tailwindcss'
import { colors } from '../tokens/colors'
import { typography } from '../tokens/typography'
import { radius } from '../tokens/radius'
import { shadows } from '../tokens/shadows'
import { animation } from '../tokens/animation'

/**
 * Edifice base Tailwind config.
 *
 * Consume this as a preset in a project's tailwind.config.ts:
 *
 *   import base from './config/tailwind.base'
 *   export default { presets: [base], content: [...] } satisfies Config
 *
 * It maps Edifice design tokens onto Tailwind's theme. The token files are the
 * single source of truth and are imported directly here, so the preset never
 * drifts from the published tokens.
 *
 * New token surface:
 *   - `grey-{0A,11,1A,22,2A,33,44,66,88,AA,CC,F0}` — the grey-first palette
 *   - accents `yellow|red|cyan|green|purple` each with DEFAULT + `-tint`
 *   - semantic `success|danger|warning|info` (DEFAULT + `-tint`)
 *   - fonts `display|body|rounded|mono`, dark-aware shadows, px radius scale
 *
 * Backwards-compatibility: the previous light-theme class families
 * (`primary-*`, `secondary-*`, `accent-*`, `neutral-*`, `surface`, `background`,
 * `overlay`, `text-*`, and the old `*-light`/`*-dark` semantics) are aliased
 * onto the new grey/accent values, so components written against the old names
 * keep working — now rendered in the dark theme.
 */

const { grey, yellow, red, cyan, green, purple } = colors

// Old neutral scale → grey, light end (50) to dark end (900).
const neutralAlias = {
  50: grey.F0,
  100: grey.CC,
  200: grey['2A'],
  300: grey['33'],
  400: grey['66'],
  500: grey['88'],
  600: grey.AA,
  700: grey.CC,
  800: grey['1A'],
  900: grey['0A'],
}

// Old primary scale → yellow-led on greys (used for buttons, rings, links).
const primaryAlias = {
  50: yellow.tint,
  100: yellow.tint,
  200: grey['33'],
  300: grey['44'],
  400: yellow.DEFAULT,
  500: yellow.DEFAULT,
  600: yellow.DEFAULT,
  700: '#D4B33E', // slightly darker yellow for hover/active
  800: '#B8992F',
  900: grey['11'],
}

const accentColors = {
  yellow: { DEFAULT: yellow.DEFAULT, tint: yellow.tint },
  red: { DEFAULT: red.DEFAULT, tint: red.tint },
  cyan: { DEFAULT: cyan.DEFAULT, tint: cyan.tint },
  green: { DEFAULT: green.DEFAULT, tint: green.tint },
  purple: { DEFAULT: purple.DEFAULT, tint: purple.tint },
}

const semanticColors = {
  success: { DEFAULT: green.DEFAULT, tint: green.tint, light: green.DEFAULT, dark: green.tint },
  danger: { DEFAULT: red.DEFAULT, tint: red.tint, light: red.DEFAULT, dark: red.tint },
  warning: { DEFAULT: yellow.DEFAULT, tint: yellow.tint, light: yellow.DEFAULT, dark: yellow.tint },
  info: { DEFAULT: cyan.DEFAULT, tint: cyan.tint, light: cyan.DEFAULT, dark: cyan.tint },
}

const base: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        // New grey-first palette.
        grey,
        // Accents.
        ...accentColors,
        // Semantic (also carries old light/dark keys for compatibility).
        ...semanticColors,

        // ---- Backwards-compatible aliases (old class families) ----
        neutral: neutralAlias,
        primary: primaryAlias,
        secondary: { ...accentColors.cyan, 600: cyan.DEFAULT, 700: '#00A5BB', 500: cyan.DEFAULT },
        accent: { ...accentColors.yellow, 400: yellow.DEFAULT, 500: yellow.DEFAULT, 600: '#D4B33E' },
        background: grey['11'],
        surface: grey['1A'],
        overlay: 'rgba(0, 0, 0, 0.7)',
        text: {
          primary: grey.F0,
          secondary: grey.AA,
          muted: grey['88'],
          inverse: grey['0A'],
        },
      },
      fontFamily: {
        display: [...typography.fontFamily.display],
        body: [...typography.fontFamily.body],
        'space-grotesk': [...typography.fontFamily.spaceGrotesk],
        'dm-mono': [...typography.fontFamily.dmMono],
        mono: [...typography.fontFamily.mono],
        // Compatibility: `font-sans` maps to the display family.
        sans: [...typography.fontFamily.display],
      },
      borderRadius: { ...radius },
      boxShadow: { ...shadows },
      spacing: {
        section: '6rem',
        gutter: '1.5rem',
      },
      maxWidth: {
        container: '80rem',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        slower: '700ms',
      },
      transitionTimingFunction: {
        spring: animation.easing.spring,
      },
    },
  },
  plugins: [],
}

export default base
