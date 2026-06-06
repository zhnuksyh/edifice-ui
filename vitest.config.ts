import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Pure util tests run in node; component and hook tests need a DOM, so they
    // run in jsdom (routed by path below). The setup file registers the
    // jest-dom matchers and post-test cleanup for the DOM tests.
    include: [
      'utils/**/*.test.ts',
      'components/**/*.test.tsx',
      'hooks/**/*.test.ts',
    ],
    environment: 'node',
    environmentMatchGlobs: [
      ['components/**', 'jsdom'],
      ['hooks/**', 'jsdom'],
    ],
    setupFiles: ['./test/setup.ts'],
  },
})
