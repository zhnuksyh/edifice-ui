import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerComponentTools } from './tools/components.js'
import { registerTokenTools } from './tools/tokens.js'
import { registerAssetTools } from './tools/assets.js'
import { registerSearchTool } from './tools/search.js'
import { registerResources } from './resources.js'

/**
 * Build the Edifice MCP server with all tools and resources registered.
 *
 * The transport is attached separately by the caller (see index.ts).
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: 'edifice',
    version: '0.1.0',
  })

  registerComponentTools(server)
  registerTokenTools(server)
  registerAssetTools(server)
  registerSearchTool(server)
  registerResources(server)

  return server
}
