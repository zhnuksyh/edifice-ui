# Prompt: Mobile Screen

Use this prompt when scaffolding a new React Native screen in a project that
consumes the Edifice library's mobile components.

---

You are scaffolding a new **React Native** screen using **Edifice** mobile
components (React Native + NativeWind) as the source of truth. Reuse before you
rebuild.

1. **Check the library first.** Look in `components/mobile/` for existing
   components (`layout/`, `ui/`, `forms/`). Reuse `ScreenShell`, `Button`
   (`Button.native`), `Card` (`Card.native`), `Input` (`Input.native`), etc.
2. **Use tokens, never hardcoded values.** Colors, spacing, radius come from
   `tokens/` via NativeWind classes. No raw hex/px, no inline `StyleSheet`
   values for things a token covers.
3. **Wrap in `ScreenShell`** for safe-area insets, scrolling, and padding.

## Inputs (fill these in)

- **Screen name:** `<e.g. ProfileScreen>`
- **Purpose:** `<one sentence>`
- **Navigation:** `<stack/tab; params it receives>`
- **Sections, top to bottom:** `<e.g. header card → settings list → save button>`
- **Primary action(s):** `<e.g. "Save changes">`

## Requirements

- Functional React Native component, **named export only**.
- File name ends in `.native.jsx` if it is itself a reusable component;
  screens may follow the host app's routing naming.
- Style with **NativeWind** classes only; accept and merge `className` with
  `cn()` where appropriate.
- Mirror the web props API for any component you build.
- Handle loading / empty / error states for data-driven sections.
- Clean up subscriptions, listeners, and timers in effects.
- No `console.log`, no dead code, no commented-out code.

## Output

1. The screen file, complete and runnable.
2. A short list of which Edifice mobile components/tokens you used.
3. A note of anything new you had to create (and why nothing existing fit).
