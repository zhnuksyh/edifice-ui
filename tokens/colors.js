/**
 * Color tokens for Edifice.
 *
 * Scales follow the 50–900 convention (50 = lightest, 900 = darkest).
 * Semantic colors expose `light` / `default` / `dark` variants.
 * Surface and text colors are role-based, not scale-based.
 *
 * All values are plain hex strings so they are platform-agnostic
 * (usable by Tailwind, NativeWind, inline JS, etc.).
 */
export const colors = {
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

  // Semantic colors — feedback states
  success: {
    light: '#86efac',
    default: '#22c55e',
    dark: '#15803d',
  },
  warning: {
    light: '#fde68a',
    default: '#f59e0b',
    dark: '#b45309',
  },
  danger: {
    light: '#fca5a5',
    default: '#ef4444',
    dark: '#b91c1c',
  },
  info: {
    light: '#93c5fd',
    default: '#3b82f6',
    dark: '#1d4ed8',
  },

  // Surface colors — backgrounds and layering
  surface: {
    background: '#ffffff',
    surface: '#f9fafb',
    overlay: 'rgba(17, 24, 39, 0.6)',
  },

  // Text colors — role-based
  text: {
    primary: '#111827',
    secondary: '#374151',
    muted: '#6b7280',
    inverse: '#f9fafb',
  },
}
