# Edifice Design Principles

This is the **source of truth** for how anything built with Edifice should be
designed. Agents and humans must read this before making design decisions —
layout, spacing, type, color, and composition all follow the rules below. When a
choice isn't covered here, prefer the option that best honors the five
principles.

---

## 1. Design philosophy

1. **Dark is a canvas — every surface level is intentional.** Three distinct
   surface levels must always be visible:
   - Page background: `grey[11]` `#111111`
   - Surface (cards): `grey[22]` `#222222`
   - Elevated (modals/popovers): `grey[2A]` `#2A2A2A`
   - Footer / page end: `grey[0A]` `#0A0A0A`
2. **Restraint is the aesthetic.** Accent color appears at most **2 visible
   instances** on screen at once. Grey does the work; the accent only
   punctuates (primary action, one highlight).
3. **Hierarchy before beauty.** Every section has a clear visual priority order
   the eye follows: label → heading → subheading → content → action.
4. **Spacing is content.** Never compress spacing to fit more in. If it doesn't
   fit, simplify the content.
5. **Components work in context.** Every component is validated in a real
   composition (the playground Live Preview), not just in isolation.

---

## 2. Global layout rules

- **Max content width:** `1200px`, centered, on every section.
- **Horizontal padding:** `48px` desktop · `24px` tablet (≤1024px) · `16px`
  mobile (≤640px).
- **Section vertical padding scale** (no exceptions):
  | Size   | Top    | Bottom |
  | ------ | ------ | ------ |
  | Hero   | 120px  | 100px  |
  | Large  | 96px   | 96px   |
  | Medium | 72px   | 72px   |
  | Small  | 48px   | 48px   |
- **Background alternation (scroll rhythm):** the hero and every **odd** section
  use page background `grey[11]`; **even** sections use surface `grey[1A]`.
- **Section intro pattern** (every section except hero):
  - Optional **label**: 12px, uppercase, tracking-widest, accent color,
    `margin-bottom: 12px`
  - **Heading**: H2 scale, weight 600, `margin-bottom: 16px`
  - **Subheading**: 18px `grey[88]`, `max-width: 520px`, centered,
    `margin-bottom: 48px`
- **Line length:** headings ≤ 15 words; body text ≤ ~70 characters per line,
  enforced with `max-width`.
- **Color via variables:** drive all themeable color through CSS variables (or
  tokens). **Zero hardcoded color values** in composed pages.

---

## 3. Typography scale

| Role    | Size | Weight | Line-height | Font           | Notes               |
| ------- | ---- | ------ | ----------- | -------------- | ------------------- |
| Display | 56px | 600    | 1.05        | Montserrat     |                     |
| H1      | 40px | 600    | 1.1         | Montserrat     |                     |
| H2      | 32px | 600    | 1.15        | Montserrat     |                     |
| H3      | 20px | 500    | 1.3         | Montserrat     |                     |
| H4      | 16px | 500    | 1.4         | Poppins        |                     |
| Body    | 16px | 400    | 1.7         | Poppins        |                     |
| Small   | 14px | 400    | 1.6         | Poppins        |                     |
| Label   | 12px | 500    | —           | Poppins        | tracking-widest, uppercase |
| Mono    | 14px | 400    | 1.6         | JetBrains Mono |                     |

Presets may swap the display/body families (e.g. Obsidian uses Space Grotesk +
DM Mono); the **scale stays constant**.

---

## 4. Composition recipe by section

**Navbar** — `grey[11]` at 85% opacity + `backdrop-blur`; 1px `grey[2A]` bottom
border; 64px fixed height; logo in accent (Montserrat 700); links `grey[AA]` →
`grey[F0]` on hover (150ms); active link in accent; one accent CTA. No desktop
"menu" button.

**Hero** — page bg with a subtle accent radial glow (6% opacity, ~800px,
centered behind the heading); pill badge (accent tint bg, accent border at 40%,
accent text, uppercase tracking-widest); Display heading (≤700px); 18px `grey[88]`
subtext (≤560px); a **matched** button pair (equal height/radius — primary =
accent fill, secondary = transparent + `grey[2A]` border); a small trust line
below. Nothing else in the hero.

**Feature grid** — alternating surface; standard section intro; cards in
`grey[22]` with 1px `grey[2A]` border, radius lg, 28px padding; icon + title on
one line (accent 20px outline icon + H3 title), body below; hover brightens
border to `grey[44]` with `shadow-md` and a 2px lift (200ms).

**Stats** — page bg, bordered top/bottom band; section intro; accent icon (24px)
above an accent number (48px/600) above an uppercase `grey[66]` label.

**Testimonial** — alternating surface; no star ratings; large decorative quote
mark (accent, ~120px, 40% opacity); 22px italic `grey[F0]` quote (≤640px);
author block (44px initials avatar on `grey[2A]`, name `grey[F0]` 500, role
`grey[66]`).

**CTA** — page bg with a fainter accent glow (4%); H1 heading; muted subtext; a
single accent CTA (52px tall); a trust line below.

**Footer** — darkest surface `grey[0A]` to signal the page end; 1px `grey[2A]`
top border; four columns (Brand + three link groups); H4 column headings,
`grey[66]` links → `grey[AA]` on hover; bottom bar with copyright left and a
"Built with Edifice" note right in `grey[44]`. 72px top / 48px bottom padding.

---

## 5. Icons

All icons come from **lucide-react** (web) / **lucide-react-native** (mobile),
**outline style only**, imported individually. Size and color with tokens/CSS
variables, never inline hardcoded colors. See `CLAUDE.md` → Icons.

---

## 6. Reference implementation

The playground **Live Preview** page (`playground/src/live-preview/`) is the
canonical, runnable application of every rule above. It composes real Edifice
components, alternates surfaces, follows the spacing/type scales, and re-themes
live across the Dark / Void / Obsidian presets — use it to validate any new
component "in context."
