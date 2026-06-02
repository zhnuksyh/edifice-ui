#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { createServer } from './server.js'

/**
 * Edifice MCP server entrypoint.
 *
 * Serves the Edifice component & design library to MCP clients over stdio.
 */
async function main(): Promise<void> {
  const server = createServer()
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((error) => {
  // stderr is safe; stdout is reserved for the JSON-RPC stream.
  console.error('Fatal error starting Edifice MCP server:', error)
  process.exit(1)
})
