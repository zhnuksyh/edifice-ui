# Prompt: Code Review

Use this prompt to review code (a PR, a file, or a diff) against Edifice's
quality rules and conventions.

---

You are reviewing code for adherence to the **Edifice** library's standards. Be
specific: cite the file and line, explain why it violates a rule, and propose the
fix. Group findings by severity (**blocker**, **should-fix**, **nit**).

## Checklist

### Conventions

- [ ] Named exports only — no default exports.
- [ ] Written in TypeScript (`.ts` / `.tsx`); components export a typed `Props`
      interface and avoid `any`.
- [ ] Components accept `className` and merge it via `cn()` (web).
- [ ] Mobile components end in `.native.tsx` and use NativeWind.
- [ ] JSDoc block present on every component, hook, and util (types document the
      props / params / return).
- [ ] File placed in the correct folder/category.

### Tokens & styling

- [ ] No hardcoded colors, font sizes, spacing, radii, or shadows — values come
      from `tokens/`.
- [ ] Tailwind utility classes only — **no inline styles**.
- [ ] No arbitrary values where a token/utility exists.

### Quality

- [ ] No dead code (unused vars, imports, functions, exports).
- [ ] No commented-out code.
- [ ] No `console.log` (`console.warn`/`error` allowed).
- [ ] Each function does one thing.
- [ ] Edge cases handled: empty, loading, error, disabled states.
- [ ] No new npm dependencies added without explicit approval.

### Correctness & a11y

- [ ] Hooks follow the rules of hooks; effect dependencies are correct.
- [ ] Event listeners and timers are cleaned up.
- [ ] Interactive elements have accessible roles/labels and keyboard support.
- [ ] API calls go through the service layer, not inline `fetch`
      (see `architecture/api-layer.md`).
- [ ] Errors handled per `architecture/error-handling.md`.

### Git hygiene

- [ ] Branch name uses `feat/ | fix/ | chore/ | refactor/`.
- [ ] Commit messages follow Conventional Commits.
- [ ] No direct commits to `main`.

## Output

1. Findings grouped by severity, each with `file:line`, the problem, and the fix.
2. A short summary: is this mergeable as-is, mergeable after fixes, or needs
   rework?
