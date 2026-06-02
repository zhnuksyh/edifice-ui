import type { CSSProperties, ReactNode } from 'react'

/**
 * Live Preview layout + typography primitives.
 *
 * These encode Edifice's composition rules (max width, padding scale, surface
 * alternation, type scale) so every section on the page follows the same system.
 * All color/surface values flow through the `--lp-*` CSS variables so the preset
 * switcher re-themes everything live.
 */

export const MAX_WIDTH = 1200

/** Section vertical padding scale. */
export const SECTION_PAD = {
  hero: { top: 120, bottom: 100 },
  large: { top: 96, bottom: 96 },
  medium: { top: 72, bottom: 72 },
  small: { top: 48, bottom: 48 },
} as const

export type SectionSize = keyof typeof SECTION_PAD

const display = "var(--lp-font-display)"
const body = "var(--lp-font-body)"

/** Global type scale (Edifice design principles). */
export const type = {
  display: { fontFamily: display, fontSize: 56, fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.02em' },
  h1: { fontFamily: display, fontSize: 40, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.02em' },
  h2: { fontFamily: display, fontSize: 32, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.01em' },
  h3: { fontFamily: display, fontSize: 20, fontWeight: 500, lineHeight: 1.3 },
  h4: { fontFamily: body, fontSize: 16, fontWeight: 500, lineHeight: 1.4 },
  body: { fontFamily: body, fontSize: 16, fontWeight: 400, lineHeight: 1.7 },
  small: { fontFamily: body, fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
  label: {
    fontFamily: body,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  mono: { fontFamily: "var(--lp-font-mono, 'JetBrains Mono', monospace)", fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
} satisfies Record<string, CSSProperties>

interface SectionProps {
  size: SectionSize
  /** Surface tone: page bg (odd) vs alternating surface (even). */
  tone?: 'bg' | 'alt'
  /** Draw 1px top/bottom borders to define the band. */
  bordered?: boolean
  style?: CSSProperties
  children: ReactNode
}

/** A full-width band with the correct padding, surface tone, and inner max-width. */
export function Section({ size, tone = 'bg', bordered, style, children }: SectionProps) {
  const pad = SECTION_PAD[size]
  return (
    <section
      style={{
        backgroundColor: tone === 'alt' ? 'var(--lp-bg-alt)' : 'var(--lp-bg)',
        borderTop: bordered ? '1px solid var(--lp-border)' : undefined,
        borderBottom: bordered ? '1px solid var(--lp-border)' : undefined,
        paddingTop: pad.top,
        paddingBottom: pad.bottom,
        ...style,
      }}
    >
      <div className="lp-container" style={{ maxWidth: MAX_WIDTH, margin: '0 auto', width: '100%' }}>
        {children}
      </div>
    </section>
  )
}

interface SectionIntroProps {
  label?: string
  heading: string
  subheading?: string
}

/** Standard section intro: accent label, H2 heading, muted subheading. */
export function SectionIntro({ label, heading, subheading }: SectionIntroProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      {label && (
        <p style={{ ...type.label, color: 'var(--lp-accent)', marginBottom: 12 }}>{label}</p>
      )}
      <h2 style={{ ...type.h2, color: 'var(--lp-text)', marginBottom: 16 }}>{heading}</h2>
      {subheading && (
        <p
          style={{
            ...type.body,
            fontSize: 18,
            color: 'var(--lp-text-muted)',
            maxWidth: 520,
            margin: '0 auto',
          }}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}
