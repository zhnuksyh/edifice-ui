# Style Variants Convention

This is the **source of truth** for the `styleVariant` prop pattern in Edifice
components. Read it before adding a new component, or before adding a second
visual look to an existing one. The goal is one consistent, predictable axis for
"how a component looks" that agents and humans apply the same way every time.

---

## 1. What `styleVariant` is (and is not)

A component can vary along **two independent axes**:

- **`variant`** — the *semantic role / hue*. Answers "what does this mean?"
  (e.g. Badge `success` vs `danger`, Button `primary` vs `ghost`). Tied to
  meaning and color.
- **`styleVariant`** — the *visual treatment / shape*. Answers "how is it
  drawn?" (e.g. Badge `soft` vs `solid` vs `outline`, Input `outline` vs
  `filled` vs `underline`). Independent of meaning.

The two are **orthogonal**: any `variant` combines with any `styleVariant`. A
`danger` Badge can be `soft`, `solid`, or `outline`; the hue and the treatment
do not know about each other.

`styleVariant` is **not**:

- a size axis (that is `size`),
- a state (error/loading/disabled are their own props),
- a place to encode one-off overrides (use `className` for those).

---

## 2. The rules

Every component that exposes `styleVariant` must follow all of these.

1. **Backwards-compatible default.** The default `styleVariant` reproduces the
   component's original look **exactly** — same emitted classes. Adding the prop
   never changes existing call sites. Pick the default that matches what the
   component looked like before the axis existed.

2. **Exported, typed union.** Export a named type `<Component>StyleVariant` as a
   string-literal union. The values are short, lowercase, treatment-descriptive
   words (`soft`, `solid`, `outline`, `filled`, `underline`, `elevated`,
   `outlined`, `ghost`, …) — never `default`/`variant1`.

   ```tsx
   export type BadgeStyleVariant = 'soft' | 'solid' | 'outline'
   ```

3. **Optional or defaulted, never required.** Either give it a default in the
   signature (`styleVariant = 'outline'`) or make the prop optional and branch on
   its presence. A consumer must be able to omit it.

4. **JSDoc each value.** Document what every member looks like on the prop, and
   mark which one is the original:

   ```tsx
   /**
    * Surface treatment. Defaults to 'outline'.
    * - `outline` — surface fill with a full hairline border (the original).
    * - `filled` — brighter fill, borderless until focus.
    * - `underline` — transparent, bottom border only.
    */
   styleVariant?: InputStyleVariant
   ```

5. **Treatment map, not scattered conditionals.** Resolve the look through a
   single `Record<StyleVariant, …>` lookup keyed by the prop, declared in the
   component body. Do not sprinkle `styleVariant === 'x' && …` across the JSX.

6. **Tokens only.** Treatments use token classes (`bg-grey-22`, `border-grey-2A`,
   `text-yellow`, `bg-yellow-tint`) — never hardcoded hex, never inline styles.
   Same rule as everywhere else in the library.

7. **Orthogonal to `variant`.** When both axes exist, the treatment map is keyed
   by *both* — `Record<StyleVariant, Record<Hue, string>>` — so every
   combination is defined. Derive the hue from `variant` if the hue space is
   smaller than the variant space (see Button below).

8. **Don't force it.** Pure primitives with no meaningful visual axis
   (Spinner, Divider, Kbd, Progress, Skeleton, Stepper, Breadcrumb, Pagination,
   Slider, Checkbox, Radio, Toggle) **do not** get a `styleVariant`. A second
   look must be genuinely useful, not invented to fill a column. When in doubt,
   leave it off.

---

## 3. Shapes by complexity

### Single-axis (most components)

One treatment map keyed by the style variant. The default arm equals the
original classes.

```tsx
export type CardStyleVariant = 'elevated' | 'outlined' | 'ghost'

export function Card({ styleVariant = 'elevated', ... }: CardProps) {
  const treatments: Record<CardStyleVariant, { fill: string; bordered: boolean; shadow: CardShadow }> = {
    elevated: { fill: 'bg-grey-1A', bordered: true, shadow: 'md' },   // the original
    outlined: { fill: 'bg-grey-1A', bordered: true, shadow: 'none' },
    ghost:    { fill: 'bg-transparent', bordered: false, shadow: 'none' },
  }
  const treatment = treatments[styleVariant]
  // …apply treatment.fill / treatment.bordered / treatment.shadow
}
```

A treatment can resolve to a class string, or to a small object of resolved
decisions (as above) when the look spans several independent classes.

### Field controls (surface + state)

Form fields layer the resting/error border colors **on top of** the treatment
surface. Key the map by style variant, with `surface` / `normal` / `invalid`
arms so error state composes with every treatment:

```tsx
const treatments: Record<InputStyleVariant, { surface: string; normal: string; invalid: string }> = {
  outline:   { surface: 'rounded-lg border bg-grey-1A focus-visible:ring-2 …', normal: 'border-grey-2A hover:border-grey-44 focus-visible:ring-yellow', invalid: 'border-danger focus-visible:ring-danger' },
  filled:    { surface: 'rounded-lg border border-transparent bg-grey-22 …',   normal: 'hover:bg-grey-2A focus-visible:ring-yellow',                      invalid: 'border-danger focus-visible:ring-danger' },
  underline: { surface: 'rounded-none border-0 border-b-2 bg-transparent',     normal: 'border-grey-2A hover:border-grey-44 focus-visible:border-yellow', invalid: 'border-danger focus-visible:border-danger' },
}
const t = treatments[styleVariant]
// className: cn(base, t.surface, error ? t.invalid : t.normal, …)
```

Note `underline` swaps the box focus-ring for a focus border-color — a ring does
not suit a single edge.

### Two-axis (treatment × hue)

When a treatment must be drawn in several hues, nest the map. Derive the hue from
`variant` when the hue space is smaller, and make `styleVariant` optional so the
original per-variant look is preserved when it is omitted:

```tsx
type ButtonHue = 'accent' | 'danger' | 'purple'

const hue: ButtonHue =
  variant === 'danger' ? 'danger' : variant === 'purple' ? 'purple' : 'accent'

const treatments: Record<ButtonStyleVariant, Record<ButtonHue, string>> = {
  solid:   { accent: '…', danger: '…', purple: '…' },
  soft:    { accent: '…', danger: '…', purple: '…' },
  outline: { accent: '…', danger: '…', purple: '…' },
}

// styleVariant (when set) wins; otherwise keep the original per-variant look.
const appearance = styleVariant ? treatments[styleVariant][hue] : variants[variant]
```

---

## 4. Shared treatment vocabulary

Reuse these names across components so the same word means the same thing. Don't
invent a synonym when one of these fits.

| Treatment   | Meaning                                              | Used by                          |
| ----------- | ---------------------------------------------------- | -------------------------------- |
| `solid`     | filled hue background, contrasting text              | Badge, Alert, Toast, Button      |
| `soft`      | tinted hue background, hue text                      | Badge, Alert, Toast, Button      |
| `outline`   | transparent, hue/hairline border + text             | Badge, Alert, Toast, Button, fields |
| `filled`    | brighter neutral fill, borderless until focus        | Input, Textarea, Select, Combobox, OtpInput |
| `underline` | transparent, bottom border only                      | Input, Textarea, Select, Combobox, OtpInput |
| `elevated`  | surface fill, border, shadow                         | Card, Popover, Menu              |
| `outlined`  | surface fill, border, no shadow                      | Card, Popover, Menu              |
| `ghost`     | transparent, no border or shadow                     | Card                             |

Layout and marketing components use layout-descriptive names instead
(`centered` / `left-aligned` / `split`, `columns` / `minimal`, `bar` /
`floating`, …) because their axis is composition, not surface. The same rules
(§2) still apply.

---

## 5. Playground

Every `styleVariant` must be visible in the playground. Add a labeled row per
treatment in the component's `Showcase` (map over the exported union), so the
isolation chip bar and the reviewer can see all treatments at a glance. The
existing sections (`ElementsSection`, `UISection`, `FormsSection`, …) show the
expected pattern: one `Row`/grid per `styleVariant`, labeled with the member
name.

---

## 6. Checklist

Before committing a new or updated `styleVariant`:

- [ ] Default arm reproduces the original look exactly.
- [ ] `<Component>StyleVariant` type is exported and JSDoc'd per value.
- [ ] Prop is optional/defaulted, never required.
- [ ] Look resolves through a `Record` treatment map, not scattered conditionals.
- [ ] Token classes only — no hex, no inline styles.
- [ ] If both axes exist, every `variant × styleVariant` combination is defined.
- [ ] A row per treatment is demoed in the playground.
- [ ] `tsc` passes and the playground builds.
