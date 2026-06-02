/**
 * Edifice base Prettier config.
 *
 * Extend in a project's prettier.config.js:
 *
 *   import base from './config/prettier.base.js'
 *   export default { ...base }
 *
 * If using the Tailwind class-sorting plugin, install
 * `prettier-plugin-tailwindcss` and add it to `plugins`.
 */

/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  semi: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
}
