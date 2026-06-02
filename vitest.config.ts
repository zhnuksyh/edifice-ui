import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Unit tests for the pure utils. Components/hooks need a DOM/RN
    // environment and are out of scope here.
    include: ['utils/**/*.test.ts'],
    environment: 'node',
  },
})
