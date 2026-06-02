/**
 * Edifice base ESLint config (flat config format).
 *
 * Extend in a project's eslint.config.js:
 *
 *   import base from './config/eslint.base.js'
 *   export default [...base, { ... project overrides ... }]
 *
 * Peer dev-deps the consuming project must install:
 *   eslint, @eslint/js, eslint-plugin-react, eslint-plugin-react-hooks,
 *   globals
 */

import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // The new JSX transform makes React-in-scope unnecessary.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Edifice quality rules.
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'smart'],
    },
  },
]
