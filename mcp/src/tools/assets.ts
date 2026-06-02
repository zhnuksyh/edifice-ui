import { z } from 'zod'
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import type { FlatDirKey } from '../catalog.js'
import { listFlatDir, readFlatItem, SafeNameError } from '../library.js'
import { text } from './shared.js'

/**
 * Register the flat-directory asset tools: hooks, utils, prompts, docs.
 *
 * Each key gets a `list_<plural>` and a `get_<singular>` tool, all backed by the
 * same flat-dir helpers.
 */
export function registerAssetTools(server: McpServer): void {
  registerPair(server, {
    key: 'hooks',
    listName: 'list_hooks',
    getName: 'get_hook',
    label: 'hook',
    getDesc:
      'Return the source of an Edifice React hook by name (e.g. name="useDebounce").',
  })

  registerPair(server, {
    key: 'utils',
    listName: 'list_utils',
    getName: 'get_util',
    label: 'util',
    getDesc:
      'Return the source of an Edifice utility function by name (e.g. name="cn").',
  })

  registerPair(server, {
    key: 'prompts',
    listName: 'list_prompts',
    getName: 'get_prompt',
    label: 'prompt template',
    getDesc:
      'Return an Edifice agent prompt template by name (e.g. name="new-component").',
  })

  registerPair(server, {
    key: 'docs',
    listName: 'list_docs',
    getName: 'get_doc',
    label: 'architecture doc',
    getDesc:
      'Return an Edifice architecture guide by name (e.g. name="api-layer").',
  })
}

interface PairConfig {
  key: FlatDirKey
  listName: string
  getName: string
  label: string
  getDesc: string
}

function registerPair(server: McpServer, cfg: PairConfig): void {
  server.registerTool(
    cfg.listName,
    {
      title: `List ${cfg.label}s`,
      description: `List the available Edifice ${cfg.label}s.`,
      inputSchema: {},
    },
    async () => {
      const names = await listFlatDir(cfg.key)
      if (names.length === 0) return text(`No ${cfg.label}s found.`)
      return text(
        `${names.length} ${cfg.label}(s):\n${names.map((n) => `- ${n}`).join('\n')}`
      )
    }
  )

  server.registerTool(
    cfg.getName,
    {
      title: `Get ${cfg.label}`,
      description: cfg.getDesc,
      inputSchema: { name: z.string() },
    },
    async ({ name }) => {
      try {
        const result = await readFlatItem(cfg.key, name)
        if (!result) {
          const available = (await listFlatDir(cfg.key)).join(', ')
          return text(`No ${cfg.label} named "${name}". Available: ${available}.`)
        }
        const header = result.path.endsWith('.md') ? '' : `// ${result.path}\n\n`
        return text(`${header}${result.source}`)
      } catch (err) {
        if (err instanceof SafeNameError) {
          return text(`Invalid name: ${JSON.stringify(name)}.`)
        }
        throw err
      }
    }
  )
}
