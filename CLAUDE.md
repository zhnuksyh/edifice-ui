# CLAUDE.md — zhnuksyh's Component & Design Library

## What This Repo Is
This is a personal component and design library — a single source of truth for
all of zhnuksyh's projects. It is optimized for AI agent consumption (Claude Code,
Codex). Everything in here is a building block: tokens, components, hooks,
utils, assets, config, architecture patterns, and prompt templates.

When working inside this repo, you are either:
1. Adding new assets to the library
2. Updating existing assets
3. Building the MCP server that serves this library

---

## Repo Structure

```
my-library/
├── CLAUDE.md                    ← You are here
├── AGENTS.md                    ← Codex equivalent of this file
├── README.md                    ← Human-readable overview
│
├── tokens/                      ← Raw design values (colors, type, spacing...)
├── components/
│   ├── web/                     ← React + TailwindCSS
│   └── mobile/                  ← React Native + NativeWind
├── hooks/                       ← Reusable React hooks
├── utils/                       ← Helper functions
├── assets/
│   ├── icons/                   ← SVG icons
│   ├── patterns/                ← Background patterns
│   └── fonts/                   ← Self-hosted fonts
├── config/                      ← Base config files (Tailwind, ESLint, TS...)
├── architecture/                ← Pattern docs and conventions
├── prompts/                     ← Agent prompt templates
└── templates/                   ← CLAUDE.md/AGENTS.md for new projects
```

---

## Rules For Working In This Repo

### Adding A New Component
- Place web components in `components/web/<category>/ComponentName.jsx`
- Place mobile components in `components/mobile/<category>/ComponentName.native.jsx`
- Categories: `layout/`, `ui/`, `forms/`, `marketing/`
- Every component must:
  - Accept a `className` prop for external overrides (web)
  - Use tokens from `tokens/` — never hardcode values
  - Use `cn()` from `utils/cn.js` for conditional classNames
  - Have a JSDoc comment at the top describing what it does and its props
  - Export as a named export, not default

### Adding A New Token
- Place it in the correct file inside `tokens/`
- Export it from `tokens/index.js`
- Values must follow the existing naming convention

### Adding A New Hook
- File name must start with `use` (camelCase)
- Must include a JSDoc comment explaining what it does, params, and return value

### Adding A New Util
- Pure functions only — no side effects
- Must include a JSDoc comment with example usage

### Adding A New Prompt Template
- Plain Markdown files inside `prompts/`
- Name must describe the task clearly (e.g. `new-page.md`, `code-review.md`)

---

## Code Quality Rules

- No dead code — do not leave unused variables, functions, imports, or exports
- No commented-out code — if it is not needed, delete it
- No `console.log` left in any committed file
- No hardcoded color values, font sizes, or spacing — use tokens
- No inline styles — Tailwind utility classes only
- No new npm dependencies without explicit instruction
- Every function does one thing
- Prefer named exports over default exports
- Always handle edge cases: empty state, loading state, error state

---

## Git Workflow

- Never commit directly to `main`
- Branch naming:
  - `feat/` — new component, token, hook, util, or asset
  - `fix/` — correcting something broken or wrong
  - `chore/` — config updates, dependency bumps, cleanup
  - `refactor/` — restructuring without changing behavior
- Commit messages follow Conventional Commits:
  ```
  feat: add HeroSection web component
  fix: correct spacing token scale
  chore: update tailwind base config
  ```
- Always lint before committing
- Never push with errors

---

## Stack

- Web components: React + TailwindCSS
- Mobile components: React Native + NativeWind
- Tokens: plain JS/JSON (platform-agnostic)
- MCP server: Node.js

---

## Agent Behavior Rules

- Before adding a new component, check if a similar one already exists
- Do not rename or restructure existing files without explicit instruction
- Do not refactor code outside the scope of the current task
- When unsure between two approaches, present both with tradeoffs — do not decide alone
- Always explain what you are about to do before doing it on large tasks
- Do not add dependencies, libraries, or packages without asking first
