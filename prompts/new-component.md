# Prompt: New Component

Use this prompt when adding a **new component to the Edifice library itself**.

---

You are adding a new component to the **Edifice** library. Follow every library
convention exactly — this code becomes a reusable building block for all future
projects.

## Inputs (fill these in)

- **Component name:** `<PascalCase, e.g. Tooltip>`
- **Category:** `<layout | ui | forms | marketing | data-display>`
- **Purpose:** `<one sentence>`
- **Props (name, type, default, description):** `<list them>`
- **States to handle:** `<e.g. open/closed, loading, disabled, error>`

## Before you write code

1. **Check for duplicates.** Search the matching `components/web/<category>/`
   folder. If something similar exists, extend it instead of adding a near-copy —
   and say so.
2. **Confirm placement.** `components/web/<category>/Name.tsx`.

## Conventions (must follow all)

- Functional React component in **TypeScript** (`.tsx`), **named export only**.
- Export a typed `Props` interface; extend the relevant element attributes
  (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`) where sensible.
- **Attribute-collision gotcha:** if a prop reuses the name of a native HTML
  attribute but with a richer type (commonly `title?: ReactNode` or
  `content?: ReactNode`, which natively are `string`), `Omit` it from the
  extended attributes or the interface won't compile — e.g.
  `interface FooProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>`.
- Accept a `className` prop and merge with `cn()` from `utils/cn`.
- **Tailwind utility classes only** — no inline styles.
- Reference `tokens/` for any non-default value (color, spacing, radius, shadow,
  duration). No hardcoded hex/px.
- JSDoc block at the top describing the component (types document the props).
- Forward unknown props (`...rest`) to the root element where sensible.
- Handle edge cases: empty, loading, disabled, error.

## After writing

- Add the component to its category folder.
- Confirm there are no `console.log`s, no unused imports, no dead code.
- Output: the component file(s), the list of tokens used, and a one-line note on
  any prop or naming decision a reviewer should check.
