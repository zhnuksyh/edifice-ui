import type { Config } from 'tailwindcss'
import base from '../config/tailwind.base'

/**
 * Playground Tailwind config.
 *
 * Uses the Edifice base config as a preset so every token-mapped utility
 * (bg-primary-600, text-text-muted, duration-fast, …) resolves exactly as it
 * does for library consumers. The content globs must include the library's
 * component sources — otherwise the classes those components use would be
 * purged and they'd render unstyled.
 */
export default {
  presets: [base],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../components/**/*.{ts,tsx}',
  ],
} satisfies Config
