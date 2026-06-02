import type { CSSProperties, ReactNode } from 'react'
import { Rocket, Zap, Shield, Globe, TrendingUp, Users } from 'lucide-react'
import { Footer } from '../../../components/web/layout/Footer'
import { Button } from '../../../components/web/ui/Button'
import {
  buttonExtraClass,
  buttonVariant,
  type LivePreviewState,
} from './config'

const NAV_LINKS = [
  { label: 'Product', href: '#', active: true },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Docs', href: '#' },
]

const FEATURES = [
  { icon: Zap, title: 'Blazing fast', body: 'Ships instantly and stays responsive under load.' },
  { icon: Shield, title: 'Secure by default', body: 'Hardened defaults so you ship with confidence.' },
  { icon: Globe, title: 'Works everywhere', body: 'One codebase, every platform, zero surprises.' },
]

const STATS = [
  { icon: Users, value: '50k+', label: 'Active users' },
  { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
  { icon: Rocket, value: '2.1s', label: 'Median load' },
]

const FOOTER_COLUMNS = [
  { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] },
  { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }] },
  { title: 'Legal', links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }] },
]

// Section padding scale — no exceptions.
const PAD = { small: 60, medium: 80, hero: 120 }
const MAX = 1200

// All accent/surface values flow through CSS variables so the preset switcher
// re-themes the whole page live. No hardcoded accent colors.
const accent = 'var(--lp-accent)'
const accentRgb = 'var(--lp-accent-rgb)'
const border = 'var(--lp-border)'
const surface = 'var(--lp-surface)'
const elevated = 'var(--lp-elevated)'
const bg = 'var(--lp-bg)'
const textPrimary = '#f0f0f0'
const textSecondary = 'var(--lp-text-secondary)'

/** The redesigned landing page, re-themed live via CSS variables. */
export function LandingPage({ state }: { state: LivePreviewState }) {
  const variant = buttonVariant(state.buttonStyle)
  const extra = buttonExtraClass(state.buttonStyle)
  const centered = state.heroLayout === 'Centered'
  const split = state.heroLayout === 'Split'

  return (
    <div style={{ backgroundColor: bg, color: textPrimary }}>
      <Navbar state={state} />

      {/* ---------- HERO ---------- */}
      <section
        style={{
          position: 'relative',
          borderTop: `1px solid ${border}`,
          paddingTop: PAD.hero,
          paddingBottom: 100,
          overflow: 'hidden',
        }}
      >
        {/* Radial accent glow behind the heading */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(${accentRgb}, 0.08) 0%, rgba(${accentRgb}, 0) 70%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: MAX,
            margin: '0 auto',
            padding: '0 24px',
            display: split ? 'grid' : 'block',
            gridTemplateColumns: split ? '1fr 1fr' : undefined,
            gap: split ? 48 : undefined,
            alignItems: 'center',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          <div
            style={{
              marginInline: centered ? 'auto' : undefined,
              maxWidth: centered ? 760 : undefined,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                border: `1px solid ${accent}`,
                backgroundColor: `rgba(${accentRgb}, 0.1)`,
                color: accent,
                borderRadius: 999,
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Now in beta
            </span>

            <h1
              style={{
                fontFamily: 'var(--lp-font-display)',
                fontWeight: 600,
                fontSize: 56,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                maxWidth: 700,
                marginInline: centered ? 'auto' : undefined,
                marginTop: 24,
                color: textPrimary,
              }}
            >
              Build once. Ship everywhere.
            </h1>

            <p
              style={{
                marginTop: 20,
                maxWidth: 600,
                marginInline: centered ? 'auto' : undefined,
                fontSize: 18,
                lineHeight: 1.6,
                color: textSecondary,
              }}
            >
              Edifice is the single source of truth for your design system —
              tokens, components, and patterns, ready for humans and agents alike.
            </p>

            {/* Matched CTA pair — identical size + radius */}
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 12,
                justifyContent: centered ? 'center' : 'flex-start',
              }}
            >
              <Button variant={variant} size="lg" className={extra}>
                Get started
              </Button>
              <Button variant="ghost" size="lg" className="border border-grey-2A">
                Learn more
              </Button>
            </div>

            <p style={{ marginTop: 16, fontSize: 13, color: '#666666' }}>
              No credit card required · Free to get started
            </p>
          </div>

          {split && (
            <div
              style={{
                aspectRatio: '4 / 3',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: surface,
                border: `1px solid ${border}`,
                borderRadius: 'var(--lp-radius)',
              }}
            >
              <Rocket style={{ width: 64, height: 64, color: accent }} strokeWidth={1.5} />
            </div>
          )}
        </div>
      </section>

      {/* ---------- FEATURE CARDS ---------- */}
      <Section pad={PAD.medium}>
        <SectionHeading>Everything you need</SectionHeading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </div>
      </Section>

      {/* ---------- STATS ---------- */}
      <section
        style={{
          backgroundColor: surface,
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          paddingTop: PAD.small,
          paddingBottom: PAD.small,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32,
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <s.icon
                style={{ width: 24, height: 24, color: accent, margin: '0 auto 12px' }}
                strokeWidth={1.75}
              />
              <p
                style={{
                  fontFamily: 'var(--lp-font-display)',
                  fontSize: 48,
                  fontWeight: 600,
                  lineHeight: 1,
                  color: accent,
                }}
              >
                {s.value}
              </p>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#888888',
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- TESTIMONIAL ---------- */}
      <section
        style={{
          borderTop: `1px solid ${border}`,
          paddingTop: PAD.medium,
          paddingBottom: PAD.medium,
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <span
            aria-hidden
            style={{
              display: 'block',
              fontFamily: 'var(--lp-font-display)',
              fontSize: 80,
              lineHeight: 0.6,
              color: accent,
              textAlign: 'left',
            }}
          >
            “
          </span>
          <blockquote
            style={{
              fontSize: 20,
              lineHeight: 1.6,
              fontStyle: 'italic',
              color: textPrimary,
              marginTop: 8,
            }}
          >
            Edifice cut our design-to-ship time in half. It's the foundation every
            project now stands on.
          </blockquote>
          <p style={{ marginTop: 24, fontSize: 14 }}>
            <span style={{ color: textPrimary, fontWeight: 500 }}>Ada Lovelace</span>
            <span style={{ color: '#666666' }}> · Head of Engineering, Analytical Co.</span>
          </p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section
        style={{
          backgroundColor: elevated,
          borderTop: `1px solid ${border}`,
          paddingTop: PAD.medium,
          paddingBottom: PAD.medium,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
          <h2
            style={{
              fontFamily: 'var(--lp-font-display)',
              fontWeight: 600,
              fontSize: 32,
              letterSpacing: '-0.02em',
              color: textPrimary,
            }}
          >
            Ready to build on solid ground?
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: textSecondary }}>
            Start with Edifice today — no rebuild required.
          </p>
          <div style={{ marginTop: 28 }}>
            <Button variant={variant} size="lg" className={extra}>
              Get started free
            </Button>
          </div>
        </div>
      </section>

      <Footer
        brand={<p className="text-sm">Edifice — build once, stand forever.</p>}
        columns={FOOTER_COLUMNS}
      />
    </div>
  )
}

/* ---------- building blocks ---------- */

/** Standard padded content section using the fixed padding scale. */
function Section({ pad, children }: { pad: number; children: ReactNode }) {
  return (
    <section style={{ paddingTop: pad, paddingBottom: pad }}>
      <div style={{ maxWidth: MAX, margin: '0 auto', padding: '0 24px' }}>{children}</div>
    </section>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--lp-font-display)',
        fontWeight: 600,
        fontSize: 30,
        letterSpacing: '-0.02em',
        textAlign: 'center',
        marginBottom: 40,
        color: textPrimary,
      }}
    >
      {children}
    </h2>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Zap
  title: string
  body: string
}) {
  const base: CSSProperties = {
    backgroundColor: elevated,
    border: `1px solid ${border}`,
    borderRadius: 'var(--lp-radius)',
    padding: 24,
    transition: 'border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease',
  }
  return (
    <div
      style={base}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#444444'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon style={{ width: 20, height: 20, color: accent }} strokeWidth={1.75} />
        <span style={{ fontFamily: 'var(--lp-font-display)', fontWeight: 600, fontSize: 16 }}>
          {title}
        </span>
      </div>
      <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.6, color: textSecondary }}>{body}</p>
    </div>
  )
}

/** Premium navbar: blurred translucent bg, bottom border, single-color logo. */
function Navbar({ state }: { state: LivePreviewState }) {
  const variant = buttonVariant(state.buttonStyle)
  const extra = buttonExtraClass(state.buttonStyle)
  const centeredLogo = state.navbarStyle === 'Centered logo'
  const withCta = state.navbarStyle === 'With CTA'

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: `rgba(var(--lp-bg-rgb), 0.8)`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${border}`,
      }}
    >
      <nav
        style={{
          maxWidth: MAX,
          margin: '0 auto',
          height: 64,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: centeredLogo ? 'center' : 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--lp-font-display)',
            fontWeight: 700,
            fontSize: 18,
            color: accent,
          }}
        >
          Edifice
        </span>

        {!centeredLogo && (
          <ul style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink label={link.label} active={link.active} />
              </li>
            ))}
          </ul>
        )}

        {!centeredLogo &&
          (withCta ? (
            <Button variant={variant} size="sm" className={extra}>
              Sign up
            </Button>
          ) : (
            <span style={{ width: 1 }} />
          ))}
      </nav>
    </header>
  )
}

function NavLink({ label, active }: { label: string; active?: boolean }) {
  return (
    <a
      href="#"
      style={{
        fontSize: 14,
        fontWeight: 500,
        color: active ? '#f0f0f0' : '#aaaaaa',
        transition: 'color 150ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f0f0')}
      onMouseLeave={(e) => (e.currentTarget.style.color = active ? '#f0f0f0' : '#aaaaaa')}
    >
      {label}
    </a>
  )
}
