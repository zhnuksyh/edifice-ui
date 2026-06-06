import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js'
import {
  listComponents,
  readComponent,
  listTokenGroups,
  readTokenGroup,
  listFlatDir,
  readFlatItem,
} from './library.js'
import { TOKEN_GROUPS } from './catalog.js'

/**
 * Register browsable MCP resources under the `edifice://` scheme.
 *
 * Each resource shares the same filesystem helpers as the tools, so there is no
 * duplicated IO. `list` callbacks let clients enumerate available URIs.
 */
export function registerResources(server: McpServer): void {
  // edifice://component/{name}
  server.registerResource(
    'component',
    new ResourceTemplate('edifice://component/{name}', {
      list: async () => {
        const entries = await listComponents()
        return {
          resources: entries.map((e) => ({
            uri: `edifice://component/${e.name}`,
            name: `${e.name} (${e.category})`,
            mimeType: 'text/plain',
          })),
        }
      },
    }),
    { title: 'Edifice component', mimeType: 'text/plain' },
    async (uri, { name }) => {
      const result = await readComponent(String(name))
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/plain',
            text: result ? result.source : `// Not found: ${name}`,
          },
        ],
      }
    }
  )

  // edifice://token/{group}
  server.registerResource(
    'token',
    new ResourceTemplate('edifice://token/{group}', {
      list: async () => ({
        resources: listTokenGroups().map((g) => ({
          uri: `edifice://token/${g}`,
          name: `tokens/${g}`,
          mimeType: 'text/plain',
        })),
      }),
      complete: {
        group: (value) =>
          TOKEN_GROUPS.filter((g) => g.startsWith(value)).slice(0, 20),
      },
    }),
    { title: 'Edifice token group', mimeType: 'text/plain' },
    async (uri, { group }) => {
      const result = await readTokenGroup(String(group))
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: 'text/plain',
            text: result ? result.source : `// Not found: token group ${group}`,
          },
        ],
      }
    }
  )

  // edifice://prompt/{name} and edifice://doc/{name}
  registerFlatResource(server, 'prompt', 'prompts', 'text/markdown')
  registerFlatResource(server, 'doc', 'docs', 'text/markdown')
}

function registerFlatResource(
  server: McpServer,
  scheme: string,
  key: 'prompts' | 'docs',
  mimeType: string
): void {
  server.registerResource(
    scheme,
    new ResourceTemplate(`edifice://${scheme}/{name}`, {
      list: async () => {
        const names = await listFlatDir(key)
        return {
          resources: names.map((n) => ({
            uri: `edifice://${scheme}/${n}`,
            name: n,
            mimeType,
          })),
        }
      },
    }),
    { title: `Edifice ${scheme}`, mimeType },
    async (uri, { name }) => {
      const result = await readFlatItem(key, String(name))
      return {
        contents: [
          {
            uri: uri.href,
            mimeType,
            text: result ? result.source : `Not found: ${scheme}/${name}`,
          },
        ],
      }
    }
  )
}
