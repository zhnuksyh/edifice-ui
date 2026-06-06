# Edifice

**Edifice** is a personal component and design library — a single source of truth
for all of zhnuksyh's projects. It is optimized for AI agent consumption (Claude
Code, Codex) so agents can fetch ready-made building blocks instead of rebuilding
them from scratch on every project.

> An edifice is built once, from solid foundations, then everything else stands on
> top of it. That is exactly what this library is.

---

## What's Inside

| Folder           | Contents                                                        |
| ---------------- | --------------------------------------------------------------- |
| `tokens/`        | Raw design values: colors, typography, spacing, radius, shadows, animation |
| `components/web/`    | React + TailwindCSS components (`layout`, `ui`, `forms`, `marketing`) |
| `components/mobile/` | React Native + NativeWind components (`.native.tsx`)        |
| `hooks/`         | Reusable React hooks                                            |
| `utils/`         | Pure helper functions                                           |
| `assets/`        | Icons, background patterns, self-hosted fonts                   |
| `config/`        | Base config files (Tailwind, ESLint, Prettier, TypeScript)     |
| `architecture/`  | Pattern docs and conventions                                    |
| `prompts/`       | Agent prompt templates                                          |
| `templates/`     | `CLAUDE.md` / `AGENTS.md` starters for new projects            |
| `mcp/`           | MCP server that serves this library to agents over stdio       |

---

## MCP Server

Edifice ships an [MCP](https://modelcontextprotocol.io) server in [`mcp/`](./mcp)
that lets agents **discover, fetch, and search** the library through tools and
resources instead of guessing file paths. It reads from the local filesystem and
speaks stdio. See [`mcp/README.md`](./mcp/README.md) for setup and the full tool
list; the short version:

```bash
cd mcp && npm install && npm run build
```

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

---

## Quick Start

This library is consumed by **fetching files directly** via raw GitHub URLs. It is
not published to npm. The raw base URL is:

```
https://raw.githubusercontent.com/zhnuksyh/edifice-ui/main/
```

### Using tokens

```ts
import { colors, spacing, typography } from './tokens'
```

### Using a component

A component is rarely self-contained — it usually imports `cn()` from `utils/`,
sometimes a hook from `hooks/`, and occasionally a sibling component. To copy one
in, you need its **local dependency graph** plus its **peer dependencies**.

**Via the MCP server (recommended):** call `get_component` with
`withDependencies: true`. It returns the component **and every local file it
imports** (utils, hooks, sibling components), plus the peer-dep install line —
everything needed to drop it into a project in one response. `get_hook` and
`get_util` take the same `withDependencies` flag.

**By hand:** copy the component file, then copy the local files it imports,
preserving the repo's `utils/` / `hooks/` / `components/` layout so the relative
imports (`../../../utils/cn`) still resolve. Then install the peer deps, e.g.:

```bash
npm install clsx tailwind-merge   # plus lucide-react for components using icons
```

```tsx
import { Button } from './components/web/ui/Button'

<Button variant="primary" size="md">Click me</Button>
```

### Extending the base Tailwind config

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import base from './config/tailwind.base'

export default {
  presets: [base],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
} satisfies Config
```

---

## Conventions

All conventions for adding tokens, components, hooks, and utils live in
[`CLAUDE.md`](./CLAUDE.md) (and its identical twin [`AGENTS.md`](./AGENTS.md)).
Read those before contributing.

The short version:

- **Named exports only.** No default exports.
- **Tokens over hardcoded values.** Never inline a color, size, or spacing value.
- **Tailwind utilities only.** No inline styles.
- **`cn()` for conditional classes.** From [`utils/cn.ts`](./utils/cn.ts).
- **JSDoc on every component, hook, and util.**
- **Conventional Commits + branch naming.** Never push to `main`.

---

## Peer Dependencies

These are **not** installed by this repo — your consuming project provides them:

- `react`
- `clsx`
- `tailwind-merge`
- `typescript` (>=5) + `@types/react`
- `tailwindcss` (web)
- `react-native` + `nativewind` (mobile; provides RN types via `@types/react-native` or its own bundled types)

---

## License

Private. © zhnuksyh.
