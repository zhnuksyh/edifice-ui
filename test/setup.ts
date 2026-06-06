/**
 * Vitest setup for DOM-based tests (components and hooks).
 *
 * Registers `@testing-library/jest-dom` matchers (toBeInTheDocument, toHaveClass,
 * …) and auto-cleans the rendered DOM after each test. Loaded only for the jsdom
 * project; the pure-util tests run in node without it.
 */
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})
