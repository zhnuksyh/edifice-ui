# Prompt: New Page

Use this prompt when scaffolding a new page/route in a project that consumes the
Edifice library.

---

You are scaffolding a new page using the **Edifice** library as the single source
of truth. Before writing any markup or styles, do the following:

1. **Check the library first.** Look in `components/web/` for existing components
   (`layout/`, `ui/`, `forms/`, `marketing/`) that cover what this page needs.
   Reuse them. Do **not** rebuild a navbar, hero, card, button, form field, etc.
   that already exists.
2. **Use tokens, never hardcoded values.** Pull colors, spacing, radius, shadow,
   and typography from `tokens/`. No raw hex codes, pixel sizes, or inline
   styles.
3. **Compose with the shell.** Wrap the page in `PageShell` with a `Navbar` and
   `Footer` unless told otherwise.

## Inputs (fill these in)

- **Page name / route:** `<e.g. /pricing>`
- **Purpose:** `<one sentence>`
- **Sections, top to bottom:** `<e.g. Hero → feature cards → pricing table → CTA → contact>`
- **Primary action(s):** `<e.g. "Start free trial">`
- **Server or client:** `<default: Server Component; mark interactive leaves 'use client'>`

## Requirements

- Functional React component, **named export only**.
- Accept and forward `className` where it makes sense; merge with `cn()`.
- Map each requested section to an Edifice component:
  - Hero → `HeroSection`
  - Call to action → `CTASection`
  - Contact form → `ContactSection`
  - Cards/content → `Card`
  - Buttons → `Button`
- Handle the three states (loading / empty / error) for any data-driven section
  (see `architecture/error-handling.md`).
- Add Next.js `metadata` (title + description) if this is a Next.js route.
- No `console.log`, no dead code, no commented-out code.

## Output

1. The page file, complete and runnable.
2. A short list of which Edifice components/tokens you used.
3. A note of anything you had to create new (and why nothing existing fit).
