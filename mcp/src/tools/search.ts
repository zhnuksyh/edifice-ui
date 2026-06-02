import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { searchLibrary } from '../library.js'
import { text } from './shared.js'

/** Register the cross-library search tool. */
export function registerSearchTool(server: McpServer): void {
  server.registerTool(
    'search',
    {
      title: 'Search the library',
      description:
        'Case-insensitive substring search across Edifice tokens, components, hooks, utils, prompts, and docs (by file name and contents). Returns ranked matches.',
      inputSchema: {
        query: z.string().min(1),
      },
    },
    async ({ query }) => {
      const hits = await searchLibrary(query)
      if (hits.length === 0) {
        return text(`No matches for "${query}".`)
      }
      const lines = hits.map(
        (h) => `- [${h.kind}] ${h.path} — ${h.snippet}`
      )
      return text(`${hits.length} match(es) for "${query}":\n${lines.join('\n')}`)
    }
  )
}
