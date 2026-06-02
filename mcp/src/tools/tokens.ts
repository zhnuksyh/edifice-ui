import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { listTokenGroups, readTokenGroup } from '../library.js'
import { text } from './shared.js'

/** Register token-related tools: list_tokens, get_token_group. */
export function registerTokenTools(server: McpServer): void {
  server.registerTool(
    'list_tokens',
    {
      title: 'List token groups',
      description:
        'List the Edifice design-token groups (colors, typography, spacing, radius, shadows, animation).',
      inputSchema: {},
    },
    async () => {
      const groups = listTokenGroups()
      return text(`Token groups:\n${groups.map((g) => `- ${g}`).join('\n')}`)
    }
  )

  server.registerTool(
    'get_token_group',
    {
      title: 'Get token group source',
      description:
        'Return the full TypeScript source of a token group (e.g. group="colors").',
      inputSchema: {
        group: z.string(),
      },
    },
    async ({ group }) => {
      const result = await readTokenGroup(group)
      if (!result) {
        return text(
          `No token group "${group}". Available: ${listTokenGroups().join(', ')}.`
        )
      }
      return text(`// ${result.path}\n\n${result.source}`)
    }
  )
}
