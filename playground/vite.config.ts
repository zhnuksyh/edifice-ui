import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// The playground imports library source from above its own folder
// (../components, ../tokens, ../utils), so Vite must be allowed to read the
// repo root.
const repoRoot = resolve(__dirname, '..')

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
