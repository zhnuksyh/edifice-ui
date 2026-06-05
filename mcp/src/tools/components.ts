import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { COMPONENT_CATEGORIES, type Platform } from '../catalog.js'
import { listComponents, readComponent, SafeNameError } from '../library.js'
import { text } from './shared.js'

/** Register component-related tools: list_components, get_component. */
export function registerComponentTools(server: McpServer): void {
  // Derive the category hint from the catalog so the description can't drift.
  const allCategories = Array.from(
    new Set([...COMPONENT_CATEGORIES.web, ...COMPONENT_CATEGORIES.mobile])
  ).join('/')

  server.registerTool(
    'list_components',
    {
      title: 'List components',
      description:
        `List Edifice components, optionally filtered by platform (web/mobile) and category (${allCategories}).`,
      inputSchema: {
        platform: z.enum(['web', 'mobile']).optional(),
        category: z.string().optional(),
      },
    },
    async ({ platform, category }) => {
      const entries = await listComponents(platform as Platform | undefined, category)
      if (entries.length === 0) {
        return text(
          `No components found${platform ? ` for platform "${platform}"` : ''}${
            category ? ` in category "${category}"` : ''
          }. Categories: web → ${COMPONENT_CATEGORIES.web.join(
            ', '
          )}; mobile → ${COMPONENT_CATEGORIES.mobile.join(', ')}.`
        )
      }
      const lines = entries.map(
        (e) => `- ${e.name} [${e.platform}/${e.category}] → ${e.path}`
      )
      return text(`${entries.length} component(s):\n${lines.join('\n')}`)
    }
  )

  server.registerTool(
    'get_component',
    {
      title: 'Get component source',
      description:
        'Return the full TypeScript source of an Edifice component by platform and name (e.g. platform="web", name="Button").',
      inputSchema: {
        platform: z.enum(['web', 'mobile']),
        name: z.string(),
      },
    },
    async ({ platform, name }) => {
      try {
        const result = await readComponent(platform as Platform, name)
        if (!result) {
          const available = (await listComponents(platform as Platform))
            .map((e) => e.name)
            .join(', ')
          return text(
            `No ${platform} component named "${name}". Available: ${available}.`
          )
        }
        return text(`// ${result.path}\n\n${result.source}`)
      } catch (err) {
        if (err instanceof SafeNameError) {
          return text(`Invalid component name: ${JSON.stringify(name)}.`)
        }
        throw err
      }
    }
  )
}
