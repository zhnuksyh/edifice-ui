import type { CSSProperties } from 'react'
import { Rocket, Zap, Shield, Globe, TrendingUp } from 'lucide-react'
import { Button } from '../../../components/web/ui/Button'
import {
  buttonExtraClass,
  buttonVariant,
  type LivePreviewState,
} from './config'
import { MAX_WIDTH, Section, SectionIntro, type } from './primitives'

const NAV_LINKS = [
  { label: 'Product', href: '#', active: true },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Docs', href: '#' },
]

const FEATURES = [
  { icon: Zap, title: 'Blazing fast', body: 'Ships instantly and stays responsive under load, even at scale.' },
  { icon: Shield, title: 'Secure by default', body: 'Hardened defaults so you ship with confidence from day one.' },
  { icon: Globe, title: 'Works everywhere', body: 'One codebase across every platform, with zero surprises.' },
]

const STATS = [
  { icon: TrendingUp, value: '50k+', label: 'Active users' },
  { icon: Shield, value: '99.9%', label: 'Uptime' },
  { icon: Zap, value: '2.1s', label: 'Median load' },
]

const FOOTER_COLS = [
  { title: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
  { title: 'Resources', links: ['Docs', 'Guides', 'Support'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact'] },
]

const accent = 'var(--lp-accent)'
const accentRgb = 'var(--lp-accent-rgb)'
const text = 'var(--lp-text)'
const muted = 'var(--lp-text-muted)'
const border = 'var(--lp-border)'

/** The Live Preview landing page, composed per Edifice design principles. */
export function LandingPage({ state }: { state: LivePreviewState }) {
  const variant = buttonVariant(state.buttonStyle)
  const extra = buttonExtraClass(state.buttonStyle)
  const centered = state.heroLayout !== 'Left-aligned'
  const split = state.heroLayout === 'Split'

  return (
    <div style={{ backgroundColor: 'var(--lp-bg)', color: text }}>
      <Navbar state={state} />

      {/* ---------- HERO (page bg) ---------- */}
      <section
        style={{
          position: 'relative',
          borderTop: `1px solid ${border}`,
          paddingTop: 120,
          paddingBottom: 100,
          overflow: 'hidden',
        }}
      >
        <Glow opacity={0.06} size={800} />
        <div
          className="lp-container"
          style={{
            position: 'relative',
            maxWidth: MAX_WIDTH,
            margin: '0 auto',
            display: split ? 'grid' : 'block',
            gridTemplateColumns: split ? '1fr 1fr' : undefined,
            gap: split ? 48 : undefined,
            alignItems: 'center',
            textAlign: centered && !split ? 'center' : 'left',
          }}
        >
          <div style={{ marginInline: centered && !split ? 'auto' : undefined, maxWidth: centered && !split ? 760 : undefined }}>
            <Badge>Now in beta</Badge>
            <h1
              style={{
                ...type.display,
                color: text,
                maxWidth: 700,
                marginInline: centered && !split ? 'auto' : undefined,
                marginTop: 24,
              }}
            >
              Build once. Ship everywhere.
            </h1>
            <p
              style={{
                ...type.body,
                fontSize: 18,
                color: muted,
                maxWidth: 560,
                marginInline: centered && !split ? 'auto' : undefined,
                marginTop: 20,
              }}
            >
              Edifice is the single source of truth for your design system —
              tokens, components, and patterns in one place.
            </p>
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                gap: 12,
                justifyContent: centered && !split ? 'center' : 'flex-start',
              }}
            >
              <Button variant={variant} size="lg" className={extra}>
                Get started
              </Button>
              <Button variant="ghost" size="lg" className="border border-grey-2A">
                Learn more
              </Button>
            </div>
            <p style={{ ...type.small, fontSize: 13, color: 'var(--lp-text-muted)', marginTop: 16 }}>
              No credit card required · Free forever
            </p>
          </div>

          {split && (
            <div
              style={{
                aspectRatio: '4 / 3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--lp-card)',
                border: `1px solid ${border}`,
                borderRadius: 'var(--lp-radius)',
              }}
            >
              <Rocket style={{ width: 64, height: 64, color: accent }} strokeWidth={1.5} />
            </div>
          )}
        </div>
      </section>

      {/* ---------- FEATURES (alt surface) ---------- */}
      <Section size="large" tone="alt">
        <SectionIntro
          label="What you get"
          heading="Everything you need to build"
          subheading="A complete foundation so you spend time shipping, not reinventing."
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} body={f.body} />
          ))}
        </div>
      </Section>

      {/* ---------- STATS (page bg, bordered band) ---------- */}
      <Section size="medium" tone="bg" bordered>
        <SectionIntro
          label="By the numbers"
          heading="Trusted at scale"
          subheading="Teams of every size build on Edifice."
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 48,
          }}
        >
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <s.icon style={{ width: 24, height: 24, color: accent, margin: '0 auto 12px' }} strokeWidth={1.75} />
              <p style={{ ...type.display, fontSize: 48, lineHeight: 1, color: accent }}>{s.value}</p>
              <p style={{ ...type.label, color: 'var(--lp-text-muted)', marginTop: 8 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- TESTIMONIAL (alt surface) ---------- */}
      <Section size="large" tone="alt">
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <span
            aria-hidden
            style={{ display: 'block', fontFamily: 'var(--lp-font-display)', fontSize: 120, lineHeight: 0.5, color: accent, opacity: 0.4, textAlign: 'left' }}
          >
            “
          </span>
          <blockquote style={{ fontSize: 22, lineHeight: 1.6, fontStyle: 'italic', color: text, marginTop: 8 }}>
            Edifice cut our design-to-ship time in half. It's the foundation every
            project now stands on.
          </blockquote>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'var(--lp-elevated)',
                color: muted,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              AL
            </span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 500, color: text }}>Ada Lovelace</p>
              <p style={{ fontSize: 13, color: 'var(--lp-text-muted)' }}>Head of Engineering, Analytical Co.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- CTA (page bg, glow) ---------- */}
      <section style={{ position: 'relative', paddingTop: 96, paddingBottom: 96, overflow: 'hidden' }}>
        <Glow opacity={0.04} size={800} />
        <div className="lp-container" style={{ position: 'relative', maxWidth: MAX_WIDTH, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...type.h1, color: text, maxWidth: 560, margin: '0 auto' }}>
            Ready to build on solid ground?
          </h2>
          <p style={{ ...type.body, color: muted, maxWidth: 480, margin: '16px auto 0' }}>
            Start with Edifice today — no rebuild required.
          </p>
          <div style={{ marginTop: 28 }}>
            <button
              type="button"
              style={{
                height: 52,
                padding: '0 40px',
                borderRadius: 'var(--lp-radius)',
                backgroundColor: accent,
                color: 'var(--lp-accent-contrast)',
                fontFamily: 'var(--lp-font-body)',
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Get started free
            </button>
          </div>
          <p style={{ ...type.small, fontSize: 13, color: 'var(--lp-text-muted)', marginTop: 16 }}>
            Join 50,000+ teams already building with Edifice
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

/* ---------- building blocks ---------- */

function Glow({ opacity, size }: { opacity: number; size: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, rgba(${accentRgb}, ${opacity}) 0%, rgba(${accentRgb}, 0) 70%)`,
        pointerEvents: 'none',
      }}
    />
  )
}

function Badge({ children }: { children: string }) {
  return (
    <span
      style={{
        ...type.label,
        display: 'inline-block',
        border: `1px solid rgba(${accentRgb}, 0.4)`,
        backgroundColor: `rgba(${accentRgb}, 0.1)`,
        color: accent,
        borderRadius: 999,
        padding: '5px 12px',
      }}
    >
      {children}
    </span>
  )
}

function FeatureCard({ icon: Icon, title, body }: { icon: typeof Zap; title: string; body: string }) {
  const base: CSSProperties = {
    backgroundColor: 'var(--lp-card)',
    border: `1px solid ${border}`,
    borderRadius: 'var(--lp-radius)',
    padding: 28,
    transition: 'border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease',
  }
  return (
    <div
      style={base}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--lp-border-strong)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon style={{ width: 20, height: 20, color: accent }} strokeWidth={1.75} />
        <span style={{ ...type.h3, color: text }}>{title}</span>
      </div>
      <p style={{ ...type.body, color: muted, marginTop: 16 }}>{body}</p>
    </div>
  )
}

/** Navbar: translucent blurred bg, bottom border, single accent logo. */
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
        height: 64,
        backgroundColor: `rgba(var(--lp-bg-rgb), 0.85)`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${border}`,
      }}
    >
      <nav
        className="lp-container"
        style={{
          maxWidth: MAX_WIDTH,
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: centeredLogo ? 'center' : 'space-between',
        }}
      >
        <span style={{ fontFamily: 'var(--lp-font-display)', fontWeight: 700, fontSize: 18, color: accent }}>
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
  const rest = active ? accent : 'var(--lp-text-secondary)'
  return (
    <a
      href="#"
      style={{ fontSize: 14, fontWeight: 500, color: rest, transition: 'color 150ms ease' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = active ? accent : text)}
      onMouseLeave={(e) => (e.currentTarget.style.color = rest)}
    >
      {label}
    </a>
  )
}

/** Footer: darkest surface (grey[0A]), four columns, bottom bar. */
function SiteFooter() {
  return (
    <footer style={{ backgroundColor: 'var(--lp-footer)', borderTop: `1px solid ${border}` }}>
      <div className="lp-container" style={{ maxWidth: MAX_WIDTH, margin: '0 auto', paddingTop: 72, paddingBottom: 48 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
          <div>
            <p style={{ fontFamily: 'var(--lp-font-display)', fontWeight: 700, fontSize: 18, color: accent }}>
              Edifice
            </p>
            <p style={{ ...type.small, fontSize: 13, color: 'var(--lp-text-muted)', marginTop: 12, maxWidth: 240 }}>
              The single source of truth for your design system.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p style={{ ...type.h4, color: text, marginBottom: 12 }}>{col.title}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <FooterLink label={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: `1px solid ${border}`,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ ...type.small, fontSize: 13, color: 'var(--lp-text-muted)' }}>
            © {new Date().getFullYear()} Edifice. All rights reserved.
          </span>
          <span style={{ ...type.small, fontSize: 13, color: 'var(--lp-border-strong)' }}>
            Built with Edifice
          </span>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      style={{ ...type.small, color: 'var(--lp-text-muted)', transition: 'color 150ms ease' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--lp-text-secondary)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--lp-text-muted)')}
    >
      {label}
    </a>
  )
}
