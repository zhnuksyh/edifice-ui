import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { COMPONENT_CATEGORIES } from '../catalog.js'
import {
  listComponents,
  readComponent,
  resolveComponentBundle,
  SafeNameError,
} from '../library.js'
import { renderBundle, text } from './shared.js'

/** Register component-related tools: list_components, get_component. */
export function registerComponentTools(server: McpServer): void {
  // Derive the category hint from the catalog so the description can't drift.
  const allCategories = COMPONENT_CATEGORIES.join('/')

  server.registerTool(
    'list_components',
    {
      title: 'List components',
      description: `List Edifice components, optionally filtered by category (${allCategories}).`,
      inputSchema: {
        category: z.string().optional(),
      },
    },
    async ({ category }) => {
      const entries = await listComponents(category)
      if (entries.length === 0) {
        return text(
          `No components found${
            category ? ` in category "${category}"` : ''
          }. Categories: ${COMPONENT_CATEGORIES.join(', ')}.`
        )
      }
      const lines = entries.map(
        (e) => `- ${e.name} [${e.category}] → ${e.path}`
      )
      return text(`${entries.length} component(s):\n${lines.join('\n')}`)
    }
  )

  server.registerTool(
    'get_component',
    {
      title: 'Get component source',
      description:
        'Return the full TypeScript source of an Edifice component by name (e.g. name="Button"). Set withDependencies=true to also return every local file the component imports (utils, hooks, sibling components) plus the peer dependencies to install — everything needed to copy it into a project.',
      inputSchema: {
        name: z.string(),
        withDependencies: z.boolean().optional(),
      },
    },
    async ({ name, withDependencies }) => {
      try {
        if (withDependencies) {
          const bundle = await resolveComponentBundle(name)
          if (!bundle) {
            const available = (await listComponents()).map((e) => e.name).join(', ')
            return text(`No component named "${name}". Available: ${available}.`)
          }
          return text(renderBundle(bundle))
        }

        const result = await readComponent(name)
        if (!result) {
          const available = (await listComponents()).map((e) => e.name).join(', ')
          return text(`No component named "${name}". Available: ${available}.`)
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
