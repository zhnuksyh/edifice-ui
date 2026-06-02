# Folder Structure

Recommended structure for a new Next.js or Vite + React project consuming the
Edifice library.

## Goals

- Predictable, agent-friendly layout — an agent should know where anything lives
  without searching.
- Feature-oriented, not type-oriented at the top level.
- Mirror Edifice's own categories (`ui`, `layout`, `forms`, `marketing`) so
  fetched components drop in cleanly.

## Next.js (App Router)

```
src/
├── app/                      # Routes (App Router)
│   ├── layout.jsx            # Root layout (fonts, providers, PageShell)
│   ├── page.jsx              # Home route
│   ├── (marketing)/          # Route group
│   └── api/                  # Route handlers
│
├── components/               # Project components (Edifice components copied/extended here)
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   └── marketing/
│
├── features/                 # Feature modules (self-contained domains)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       └── api.js            # Service layer for this feature (see api-layer.md)
│
├── hooks/                    # Shared hooks (Edifice hooks live here)
├── lib/                      # Cross-cutting helpers, clients, config
│   └── api/                  # Shared API client + per-domain services
├── tokens/                   # Edifice tokens (copied or fetched)
├── utils/                    # Edifice utils (cn, formatDate, ...)
└── styles/
    └── globals.css           # Tailwind directives + base layer
```

## Vite + React

```
src/
├── main.jsx                  # Entry; mounts <App />
├── App.jsx                   # Router + top-level PageShell
├── routes/                   # Route components
├── components/               # Same categories as above
├── features/
├── hooks/
├── lib/
├── tokens/
├── utils/
└── styles/
    └── globals.css
```

## Rules

- **One component per file**, named after the component. Named export only.
- **Co-locate** feature-specific hooks, components, and API calls inside the
  feature folder. Promote to the shared folders only when reused across features.
- **No deep nesting beyond 3 levels** inside `features/` — flatten instead.
- **Tokens, utils, and hooks fetched from Edifice keep their original filenames**
  so updates can be re-fetched without renaming.
- Path aliases (`@/`, `@components/`, etc.) are defined in
  [`config/tsconfig.base.json`](../config/tsconfig.base.json) — mirror them in
  your bundler config.
