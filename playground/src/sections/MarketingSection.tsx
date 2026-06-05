import { HeroSection } from '../../../components/web/marketing/HeroSection'
import type { HeroStyleVariant } from '../../../components/web/marketing/HeroSection'
import { CTASection } from '../../../components/web/marketing/CTASection'
import type { CTAStyleVariant } from '../../../components/web/marketing/CTASection'
import { ContactSection } from '../../../components/web/marketing/ContactSection'
import type { ContactStyleVariant } from '../../../components/web/marketing/ContactSection'
import { PricingTable } from '../../../components/web/marketing/PricingTable'
import type {
  PricingTier,
  PricingStyleVariant,
} from '../../../components/web/marketing/PricingTable'
import { FAQSection } from '../../../components/web/marketing/FAQSection'
import type { FAQStyleVariant } from '../../../components/web/marketing/FAQSection'
import { LogoCloud } from '../../../components/web/marketing/LogoCloud'
import type { LogoCloudStyleVariant } from '../../../components/web/marketing/LogoCloud'
import { Banner } from '../../../components/web/marketing/Banner'
import type { BannerStyleVariant } from '../../../components/web/marketing/Banner'
import { NewsletterSignup } from '../../../components/web/marketing/NewsletterSignup'
import type { NewsletterStyleVariant } from '../../../components/web/marketing/NewsletterSignup'
import { Button } from '../../../components/web/ui/Button'
import { Sparkles } from 'lucide-react'
import { Showcase, Row } from '../components/Showcase'

const HERO_VARIANTS: HeroStyleVariant[] = [
  'centered',
  'left-aligned',
  'split-image',
]

const CTA_VARIANTS: CTAStyleVariant[] = ['banner', 'boxed', 'gradient']

const CONTACT_VARIANTS: ContactStyleVariant[] = ['split', 'stacked', 'card']

const FAQ_VARIANTS: FAQStyleVariant[] = ['centered', 'two-column']

const PRICING_VARIANTS: PricingStyleVariant[] = ['cards', 'bordered', 'minimal']

const NEWSLETTER_VARIANTS: NewsletterStyleVariant[] = ['inline', 'card', 'split']

const LOGO_VARIANTS: LogoCloudStyleVariant[] = ['row', 'grid', 'bordered']

const BANNER_VARIANTS: BannerStyleVariant[] = ['bar', 'floating']

const LOGOS = ['Acme', 'Globex', 'Initech', 'Umbra', 'Stark'].map((name) => ({
  id: name,
  label: name,
  content: <span className="font-display text-lg font-semibold">{name}</span>,
}))

const TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: '/mo',
    description: 'For trying things out.',
    features: ['1 project', 'Community support', 'Basic components'],
    cta: 'Get started',
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    description: 'For growing teams.',
    features: ['Unlimited projects', 'Priority support', 'All components', 'MCP access'],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations.',
    features: ['SSO & SAML', 'Dedicated support', 'Custom components', 'SLA'],
    cta: 'Contact sales',
  },
]

const FAQ_ITEMS = [
  { question: 'What is Edifice?', answer: 'A personal component & design library.' },
  { question: 'How do I use it?', answer: 'Fetch components directly or via the MCP server.' },
  { question: 'Is it free?', answer: 'Yes — it is a personal, open library.' },
]

/** Hero, CTA, and Contact marketing sections with sample content. */
export function MarketingSection() {
  return (
    <div>
      <Showcase
        title="HeroSection"
        source="components/web/marketing/HeroSection.tsx"
        description="Top-of-page hero with eyebrow, headline, subcopy, and CTAs. Three styleVariant layouts."
      >
        {HERO_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <HeroSection
                styleVariant={variant}
                eyebrow="Introducing Edifice"
                title="Build once. Stand forever."
                subtitle="A single source of truth for tokens, components, and patterns — optimized for AI agents and humans alike."
                media={
                  variant === 'split-image' ? (
                    <div className="flex aspect-video items-center justify-center rounded-xl border border-grey-2A bg-grey-1A text-sm text-text-muted">
                      media slot
                    </div>
                  ) : undefined
                }
                actions={
                  <>
                    <Button size="lg">Get started</Button>
                    <Button size="lg" variant="ghost">
                      Read the docs
                    </Button>
                  </>
                }
              />
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="CTASection"
        source="components/web/marketing/CTASection.tsx"
        description="Bold call-to-action band. Three styleVariant looks: banner, boxed, gradient."
      >
        {CTA_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <CTASection
                styleVariant={variant}
                title="Ready to start building?"
                subtitle="Pull Edifice into your next project in minutes."
                actions={
                  <Button size="lg" variant="accent">
                    Start now
                  </Button>
                }
              />
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="ContactSection"
        source="components/web/marketing/ContactSection.tsx"
        description="Intro copy plus a simple contact form. Three styleVariant layouts."
      >
        {CONTACT_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <ContactSection
                styleVariant={variant}
                subtitle="Have a question? Send us a note and we'll get back to you."
                onSubmit={() => {}}
              />
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="PricingTable"
        source="components/web/marketing/PricingTable.tsx"
        description="Tiered pricing with one highlighted 'Popular' tier. Three styleVariant looks."
      >
        {PRICING_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full">
              <PricingTable tiers={TIERS} styleVariant={variant} />
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="FAQSection"
        source="components/web/marketing/FAQSection.tsx"
        description="Titled Q&A built on Accordion. Two styleVariant layouts."
      >
        {FAQ_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <FAQSection
                styleVariant={variant}
                items={FAQ_ITEMS}
                subtitle="Everything you need to know."
              />
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="Banner"
        source="components/web/marketing/Banner.tsx"
        description="Announcement bar; three tones, optional icon/action/dismiss, two styleVariants."
      >
        {BANNER_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <Banner
                styleVariant={variant}
                icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}
                action={
                  <a href="#" className="underline underline-offset-2">
                    Learn more
                  </a>
                }
                onDismiss={() => {}}
              >
                Edifice v2 is here — faster, leaner, fully typed.
              </Banner>
            </div>
          </Row>
        ))}
        <Row label="tones (bar)">
          <div className="flex w-full flex-col gap-3 overflow-hidden rounded-xl border border-grey-2A">
            <Banner tone="info">Scheduled maintenance this Sunday at 02:00 UTC.</Banner>
            <Banner tone="neutral" onDismiss={() => {}}>
              We use cookies to improve your experience.
            </Banner>
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="LogoCloud"
        source="components/web/marketing/LogoCloud.tsx"
        description="A 'trusted by' strip; muted by default, brighten on hover. Three styleVariant layouts."
      >
        {LOGO_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <LogoCloud
                styleVariant={variant}
                title="Trusted by teams at"
                logos={LOGOS}
              />
            </div>
          </Row>
        ))}
      </Showcase>

      <Showcase
        title="NewsletterSignup"
        source="components/web/marketing/NewsletterSignup.tsx"
        description="Email-capture block; calls onSubscribe(email). Three styleVariant layouts."
      >
        {NEWSLETTER_VARIANTS.map((variant) => (
          <Row key={variant} label={variant}>
            <div className="w-full overflow-hidden rounded-xl border border-grey-2A">
              <NewsletterSignup
                styleVariant={variant}
                title="Stay in the loop"
                subtitle="Get product updates and the occasional deep dive. No spam."
                note="Unsubscribe anytime."
                onSubscribe={() => {}}
              />
            </div>
          </Row>
        ))}
      </Showcase>
    </div>
  )
}
