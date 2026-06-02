import {
  Rocket,
  Zap,
  Shield,
  Star,
  TrendingUp,
  Users,
  Globe,
} from 'lucide-react'
import { Navbar } from '../../../components/web/layout/Navbar'
import { Footer } from '../../../components/web/layout/Footer'
import { HeroSection } from '../../../components/web/marketing/HeroSection'
import { CTASection } from '../../../components/web/marketing/CTASection'
import { Button } from '../../../components/web/ui/Button'
import { Card } from '../../../components/web/ui/Card'
import { cn } from '../../../utils/cn'
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
  {
    icon: Zap,
    title: 'Blazing fast',
    body: 'Ships instantly and stays responsive under load.',
  },
  {
    icon: Shield,
    title: 'Secure by default',
    body: 'Hardened defaults so you ship with confidence.',
  },
  {
    icon: Globe,
    title: 'Works everywhere',
    body: 'One codebase, every platform, zero surprises.',
  },
]

const STATS = [
  { icon: Users, value: '50k+', label: 'Active users' },
  { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
  { icon: Rocket, value: '2.1s', label: 'Median load' },
]

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
]

/** The full landing page, re-rendered from switcher state. */
export function LandingPage({ state }: { state: LivePreviewState }) {
  const variant = buttonVariant(state.buttonStyle)
  const extra = buttonExtraClass(state.buttonStyle)

  const primaryCta = (
    <Button variant={variant} className={extra}>
      Get started
    </Button>
  )
  const secondaryCta = (
    <Button variant="ghost" className="border border-grey-2A">
      Learn more
    </Button>
  )

  // Navbar style variations.
  const navbar = (() => {
    if (state.navbarStyle === 'Minimal') {
      return <Navbar brand="Edifice" links={NAV_LINKS} sticky={false} />
    }
    if (state.navbarStyle === 'Centered logo') {
      return (
        <Navbar
          brand={<span className="mx-auto">Edifice</span>}
          sticky={false}
        />
      )
    }
    // With CTA
    return (
      <Navbar
        brand="Edifice"
        links={NAV_LINKS}
        sticky={false}
        actions={
          <Button variant={variant} size="sm" className={extra}>
            Sign up
          </Button>
        }
      />
    )
  })()

  // Hero layout variations.
  const heroMedia =
    state.heroLayout === 'Split' ? (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-grey-2A bg-surface">
        <Rocket className="h-16 w-16 text-primary-600" strokeWidth={1.5} />
      </div>
    ) : undefined

  return (
    <div className="bg-background text-text-primary">
      {navbar}

      <HeroSection
        eyebrow="Now in beta"
        title="Build once. Ship everywhere."
        subtitle="Edifice is the single source of truth for your design system — tokens, components, and patterns, ready for humans and agents alike."
        media={heroMedia}
        actions={
          <>
            {primaryCta}
            {secondaryCta}
          </>
        }
        className={cn(
          state.heroLayout === 'Left-aligned' && '[&_.mx-auto]:mx-0 [&_.text-center]:text-left'
        )}
      />

      {/* Feature grid (3 columns) */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-screen-xl px-6">
          <h2 className="mb-10 text-center font-display text-3xl font-bold text-text-primary">
            Everything you need
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} header={
                <span className="flex items-center gap-2">
                  <f.icon className="h-5 w-5 text-primary-600" strokeWidth={1.5} />
                  {f.title}
                </span>
              }>
                <p className="text-text-secondary">{f.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / metrics block */}
      <section className="bg-surface py-20">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 px-6 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center">
              <s.icon className="mb-3 h-8 w-8 text-primary-600" strokeWidth={1.5} />
              <p className="font-display text-4xl font-bold text-text-primary">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-screen-md px-6 text-center">
          <div className="mb-4 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 text-primary-600" strokeWidth={1.5} />
            ))}
          </div>
          <blockquote className="font-display text-2xl font-medium leading-relaxed text-text-primary">
            “Edifice cut our design-to-ship time in half. It's the foundation
            every project now stands on.”
          </blockquote>
          <p className="mt-6 text-sm text-text-secondary">
            Ada Lovelace · Head of Engineering, Analytical Co.
          </p>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to build on solid ground?"
        subtitle="Start with Edifice today — no rebuild required."
        actions={
          <Button variant={variant} size="lg" className={extra}>
            Get started free
          </Button>
        }
      />

      <Footer
        brand={<p className="text-sm">Edifice — build once, stand forever.</p>}
        columns={FOOTER_COLUMNS}
      />
    </div>
  )
}
