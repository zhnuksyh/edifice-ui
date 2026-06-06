# Edifice MCP Server

An [MCP](https://modelcontextprotocol.io) server that serves the **Edifice**
component & design library to AI agents (Claude Code, Codex, Claude Desktop) over
**stdio**. Instead of guessing file paths and fetching raw files blind, an agent
can discover, fetch, and search the library through tools and resources.

It reads the library from the **local filesystem** — the server lives inside the
repo, so it always serves the version you have checked out.

## Install & build

```bash
cd mcp
npm install
npm run build      # compiles src/ → dist/
```

## Run

```bash
npm run dev        # run from source via tsx (no build needed)
npm start          # run the built server (dist/index.js)
npm run smoke      # build first, then: end-to-end smoke test
```

The server communicates over stdio; there is no HTTP port. It is meant to be
spawned by an MCP client.

## Configure in an MCP client

Add to your Claude Code / Claude Desktop MCP config (use an absolute path):

```json
{
  "mcpServers": {
    "edifice": {
      "command": "node",
      "args": ["/absolute/path/to/edifice-ui/mcp/dist/index.js"]
    }
  }
}
```

By default the server locates the repo root automatically (it walks up from its
own location looking for `tokens/` + `components/`). To point it at a specific
checkout, set `EDIFICE_ROOT`:

```json
{
  "mcpServers": {
    "edifice": {
      "command": "node",
      "args": ["/path/to/edifice-mcp/dist/index.js"],
      "env": { "EDIFICE_ROOT": "/path/to/edifice-ui" }
    }
  }
}
```

## Tools

| Tool | Input | Returns |
| --- | --- | --- |
| `list_components` | `platform?`, `category?` | component names + paths |
| `get_component` | `platform`, `name`, `withDependencies?` | component `.tsx` source; with `withDependencies: true`, also every local file it imports (utils/hooks/sibling components) + peer deps to install |
| `list_tokens` | — | the six token group names |
| `get_token_group` | `group` | `tokens/<group>.ts` source |
| `list_hooks` / `get_hook` | — / `name` | hook listing / source |
| `list_utils` / `get_util` | — / `name` | util listing / source |
| `list_prompts` / `get_prompt` | — / `name` | prompt-template listing / markdown |
| `list_docs` / `get_doc` | — / `name` | architecture-doc listing / markdown |
| `search` | `query` | ranked matches across the library |

## Resources

Browsable / attachable under the `edifice://` scheme:

- `edifice://component/{platform}/{name}`
- `edifice://token/{group}`
- `edifice://prompt/{name}`
- `edifice://doc/{name}`

## Design notes

- **Read-only.** The server never writes to the library.
- **Path-traversal guarded.** Names are validated and every resolved path is
  asserted to stay within the repo root.
- **Own dependencies.** This package has its own `package.json` (MCP SDK + zod);
  those deps deliberately do not leak into the Edifice library's peer-dependency
  contract.
