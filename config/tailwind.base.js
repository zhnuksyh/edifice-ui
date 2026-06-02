/**
 * Edifice base Tailwind config.
 *
 * Consume this as a preset in a project's tailwind.config.js:
 *
 *   const base = require('./config/tailwind.base.js')
 *   module.exports = { presets: [base], content: [...] }
 *
 * It maps Edifice design tokens onto Tailwind's theme so utility classes like
 * `bg-primary-600`, `text-text-muted`, `rounded-xl`, `shadow-md`, and the
 * semantic color utilities (`bg-success`, `text-danger-dark`) all resolve to
 * token values.
 *
 * Token files are ESM; this config is CommonJS, so the token values are inlined
 * here to keep the preset dependency-free and require()-able.
 */

const colors = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  success: { light: '#86efac', DEFAULT: '#22c55e', dark: '#15803d' },
  warning: { light: '#fde68a', DEFAULT: '#f59e0b', dark: '#b45309' },
  danger: { light: '#fca5a5', DEFAULT: '#ef4444', dark: '#b91c1c' },
  info: { light: '#93c5fd', DEFAULT: '#3b82f6', dark: '#1d4ed8' },
  background: '#ffffff',
  surface: '#f9fafb',
  overlay: 'rgba(17, 24, 39, 0.6)',
  text: {
    primary: '#111827',
    secondary: '#374151',
    muted: '#6b7280',
    inverse: '#f9fafb',
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
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
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
