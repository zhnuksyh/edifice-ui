# Prompt: New Component

Use this prompt when adding a **new component to the Edifice library itself**.

---

You are adding a new component to the **Edifice** library. Follow every library
convention exactly — this code becomes a reusable building block for all future
projects.

## Inputs (fill these in)

- **Component name:** `<PascalCase, e.g. Tooltip>`
- **Category:** `<layout | ui | forms | marketing>`
- **Platform:** `<web | mobile | both>`
- **Purpose:** `<one sentence>`
- **Props (name, type, default, description):** `<list them>`
- **States to handle:** `<e.g. open/closed, loading, disabled, error>`

## Before you write code

1. **Check for duplicates.** Search the matching `components/<platform>/<category>/`
   folder. If something similar exists, extend it instead of adding a near-copy —
   and say so.
2. **Confirm placement.** Web → `components/web/<category>/Name.jsx`. Mobile →
   `components/mobile/<category>/Name.native.jsx`.

## Conventions (must follow all)

Web:

- Functional React component, **named export only**.
- Accept a `className` prop and merge with `cn()` from `utils/cn.js`.
- **Tailwind utility classes only** — no inline styles.
- Reference `tokens/` for any non-default value (color, spacing, radius, shadow,
  duration). No hardcoded hex/px.
- JSDoc block at the top describing the component and every prop.
- Forward unknown props (`...rest`) to the root element where sensible.
- Handle edge cases: empty, loading, disabled, error.

Mobile:

- Functional React Native component using **NativeWind**.
- File ends in `.native.jsx`.
- **Mirror the web component's props API** where possible.
- Same JSDoc and `cn()` rules.

## After writing

- Add the component to its category folder.
- Confirm there are no `console.log`s, no unused imports, no dead code.
- Output: the component file(s), the list of tokens used, and a one-line note on
  any prop or naming decision a reviewer should check.
