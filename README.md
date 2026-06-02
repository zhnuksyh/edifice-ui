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

Copy the component file into your project (or fetch it), then ensure the
peer dependencies are installed:

```bash
npm install clsx tailwind-merge
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
