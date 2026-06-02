# Edifice Playground

A visual preview app for the **Edifice** library. It renders every web component
(with its variants) and showcases the design tokens, wired directly to the
library source in `../components`, `../tokens`, and `../utils` — so what you see
is exactly what consumers get.

## Run it

```bash
cd playground
npm install
npm run dev
```

Open the printed `localhost` URL in your browser. Use the sidebar to browse:
**Tokens, Buttons, UI, Forms, Layout, Marketing**.

## Build (production / CI check)

```bash
npm run build      # tsc typecheck + vite build
npm run preview    # serve the built output
```

## How it's wired

- **Tailwind** uses [`../config/tailwind.base`](../config/tailwind.base.ts) as a
  preset and scans `../components/**` in its `content`, so every token-mapped
  utility class (`bg-primary-600`, `text-text-muted`, `duration-fast`, …) the
  components rely on is generated. Without this the components would render
  unstyled.
- **Vite** is allowed to read the repo root (`server.fs.allow`) so it can import
  library files from above this folder.
- **Fonts** (Inter, JetBrains Mono) load from Google Fonts in `index.html`.
- This app has its own `package.json`; its dev dependencies do not affect the
  Edifice library's dependency contract. `node_modules/` and `dist/` are
  gitignored.

## Notes

- The playground renders **web** components only. React Native (`.native`)
  components need a different runtime and are out of scope here.
- The token swatches use inline `style` for dynamic color values — a deliberate
  exception that applies to this dev tool, not to library components (which use
  Tailwind utilities only).
