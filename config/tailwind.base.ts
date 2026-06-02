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
 * It maps Edifice design tokens onto Tailwind's theme so utility classes like
 * `bg-primary-600`, `text-text-muted`, `rounded-xl`, `shadow-md`, and the
 * semantic color utilities (`bg-success`, `text-danger-dark`) all resolve to
 * token values.
 *
 * Token files are the single source of truth and are imported directly here, so
 * the preset never drifts from the published tokens. Semantic color scales use
 * a `DEFAULT` key so both `bg-success` and `bg-success-dark` work.
 */

const semanticColors = {
  success: {
    light: colors.success.light,
    DEFAULT: colors.success.default,
    dark: colors.success.dark,
  },
  warning: {
    light: colors.warning.light,
    DEFAULT: colors.warning.default,
    dark: colors.warning.dark,
  },
  danger: {
    light: colors.danger.light,
    DEFAULT: colors.danger.default,
    dark: colors.danger.dark,
  },
  info: {
    light: colors.info.light,
    DEFAULT: colors.info.default,
    dark: colors.info.dark,
  },
}

const base: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        neutral: colors.neutral,
        ...semanticColors,
        background: colors.surface.background,
        surface: colors.surface.surface,
        overlay: colors.surface.overlay,
        text: colors.text,
      },
      fontFamily: {
        sans: [...typography.fontFamily.sans],
        body: [...typography.fontFamily.body],
        mono: [...typography.fontFamily.mono],
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
