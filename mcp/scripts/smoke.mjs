/**
 * Smoke test for the Edifice MCP server.
 *
 * Spawns the built server over stdio, lists tools + resources, and calls a few
 * tools (including a path-traversal attempt) to confirm end-to-end behavior.
 *
 * Run after `npm run build`:  node scripts/smoke.mjs
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js'

const transport = new StdioClientTransport({
  command: 'node',
  args: ['dist/index.js'],
})

const client = new Client({ name: 'edifice-smoke', version: '0.0.0' })

function firstText(result) {
  const block = result.content?.find((c) => c.type === 'text')
  return block ? block.text : '(no text)'
}

function assert(label, condition) {
  const ok = Boolean(condition)
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${label}`)
  if (!ok) process.exitCode = 1
  return ok
}

await client.connect(transport)

// 1. tools/list
const { tools } = await client.listTools()
const toolNames = tools.map((t) => t.name).sort()
console.log('tools:', toolNames.join(', '))
assert('exposes >= 11 tools', tools.length >= 11)
assert('has get_component', toolNames.includes('get_component'))
assert('has search', toolNames.includes('search'))

// 2. resources/list (templates)
const { resourceTemplates } = await client.listResourceTemplates()
console.log(
  'resource templates:',
  resourceTemplates.map((r) => r.uriTemplate).join(', ')
)
assert('exposes resource templates', resourceTemplates.length >= 3)

// 3. list_components → expect the web categories present
const listed = firstText(await client.callTool({ name: 'list_components', arguments: {} }))
assert('list_components lists components with categories', listed.includes('[ui]'))

// 4. get_component Button
const button = firstText(
  await client.callTool({
    name: 'get_component',
    arguments: { name: 'Button' },
  })
)
assert('Button source returned', button.includes('export function Button'))

// 4b. get_component withDependencies → bundle resolves transitive local files + peer deps
const bundle = firstText(
  await client.callTool({
    name: 'get_component',
    arguments: { name: 'Select', withDependencies: true },
  })
)
assert('bundle includes the entry component', bundle.includes('components/web/forms/Select.tsx'))
assert('bundle resolves local util (cn)', bundle.includes('utils/cn.ts'))
assert('bundle resolves local hook (useClickOutside)', bundle.includes('hooks/useClickOutside.ts'))
assert('bundle lists peer deps to install', /npm install .*lucide-react/.test(bundle))

// 4c. sibling-component imports resolve transitively (Button → Spinner)
const buttonBundle = firstText(
  await client.callTool({
    name: 'get_component',
    arguments: { name: 'Button', withDependencies: true },
  })
)
assert('bundle resolves sibling component (Spinner)', buttonBundle.includes('components/web/ui/Spinner.tsx'))

// 4d. get_util withDependencies → util bundle lists its peer deps
const utilBundle = firstText(
  await client.callTool({
    name: 'get_util',
    arguments: { name: 'cn', withDependencies: true },
  })
)
assert('util bundle includes the entry file', utilBundle.includes('utils/cn.ts'))
assert('util bundle lists peer deps', /npm install .*clsx.*tailwind-merge/.test(utilBundle))

// 4e. get_hook withDependencies → hook bundle resolves + lists peer deps
const hookBundle = firstText(
  await client.callTool({
    name: 'get_hook',
    arguments: { name: 'useClickOutside', withDependencies: true },
  })
)
assert('hook bundle includes the entry file', hookBundle.includes('hooks/useClickOutside.ts'))

// 5. get_token_group colors
const colors = firstText(
  await client.callTool({ name: 'get_token_group', arguments: { group: 'colors' } })
)
assert('colors token source returned', colors.includes('export const colors'))

// 6. search "cn"
const search = firstText(await client.callTool({ name: 'search', arguments: { query: 'cn' } }))
assert('search finds utils/cn', search.includes('utils/cn'))

// 7. path-traversal guard
const traversal = firstText(
  await client.callTool({
    name: 'get_component',
    arguments: { platform: 'web', name: '../../package' },
  })
)
assert(
  'traversal blocked (no file contents leaked)',
  !traversal.includes('"name": "edifice-ui"') && /Invalid|No web component/.test(traversal)
)

await client.close()
console.log(process.exitCode ? '\nSMOKE FAILED' : '\nSMOKE OK')
