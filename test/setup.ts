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

// jsdom doesn't implement scrollIntoView, which keyboard-navigable components
// (Menu, Select, Combobox) call when moving the active item. Stub it as a no-op.
// Guarded because this setup file also loads for the node-env util tests, where
// `Element` does not exist.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

afterEach(() => {
  cleanup()
})
