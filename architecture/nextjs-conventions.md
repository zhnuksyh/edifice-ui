# Next.js Conventions

Conventions for Next.js (App Router) projects built on Edifice.

## File naming & routing

- Routes live in `src/app/`. A folder = a route segment; `page.jsx` = the route's
  UI.
- Special files: `layout.jsx`, `page.jsx`, `loading.jsx`, `error.jsx`,
  `not-found.jsx`, `route.js` (API handlers).
- **Dynamic segments**: `[id]/page.jsx`. **Catch-all**: `[...slug]`. **Optional
  catch-all**: `[[...slug]]`.
- **Route groups** for organization without affecting the URL: `(marketing)/`,
  `(app)/`.
- **Private folders** (excluded from routing): prefix with `_`, e.g.
  `_components/`.
- Component files use `PascalCase.jsx`; route files use the framework's
  lowercase special names.

## Server vs Client components

Default to **Server Components**. Add `'use client'` only when a file needs:

- State or lifecycle (`useState`, `useEffect`, refs).
- Browser-only APIs (`window`, `localStorage`, `matchMedia`).
- Event handlers (`onClick`, `onChange`).
- Edifice hooks (`useToggle`, `useMediaQuery`, etc.) or interactive components
  (`Modal`, `Accordion`, `Toggle`).

Guidelines:

- Push `'use client'` to the **leaves** of the tree. Keep layouts and pages as
  Server Components; mark only the interactive widget as a client component.
- Fetch data in Server Components (async components) where possible; pass data
  down as props.
- Never put secrets in a client component — they ship to the browser.

```jsx
// Server Component (default) — no directive
export default async function Page() {
  const posts = await getPosts() // runs on the server
  return <PostList posts={posts} />
}
```

```jsx
'use client'
// Client Component — interactivity only
import { useToggle } from '@/hooks/useToggle'
```

## Metadata

Use the Metadata API, not manual `<head>` tags.

```jsx
// Static
export const metadata = {
  title: 'Pricing — Acme',
  description: 'Simple, transparent pricing.',
}

// Dynamic
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id)
  return { title: `${product.name} — Acme` }
}
```

- Set a base in the root layout via `metadata.metadataBase` and a title
  template (`title: { template: '%s — Acme', default: 'Acme' }`).
- Co-locate Open Graph images as `opengraph-image.jsx`/`.png` in the segment.

## Data fetching & caching

- Prefer `fetch` in Server Components; control caching with
  `{ cache: 'force-cache' | 'no-store' }` or `next: { revalidate: <seconds> }`.
- Mutations go through **Server Actions** (`'use server'`) or route handlers,
  then revalidate with `revalidatePath` / `revalidateTag`.
- Client-side data still goes through the service layer (see
  [`api-layer.md`](./api-layer.md)).

## Layouts

- The root `layout.jsx` sets `<html>`/`<body>`, loads fonts (`next/font`), wraps
  the app in providers, and renders the Edifice `PageShell` / `Navbar` /
  `Footer`.
- Nested layouts persist across navigation within their segment — use them for
  sidebars and section chrome.

## Images & fonts

- Use `next/image` for all raster images (automatic sizing/optimization).
- Use `next/font` to self-host the fonts referenced in the typography tokens
  (`Inter`, `JetBrains Mono`) with zero layout shift.
