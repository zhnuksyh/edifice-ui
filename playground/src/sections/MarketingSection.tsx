import { HeroSection } from '../../../components/web/marketing/HeroSection'
import { CTASection } from '../../../components/web/marketing/CTASection'
import { ContactSection } from '../../../components/web/marketing/ContactSection'
import { PricingTable } from '../../../components/web/marketing/PricingTable'
import type { PricingTier } from '../../../components/web/marketing/PricingTable'
import { FAQSection } from '../../../components/web/marketing/FAQSection'
import { LogoCloud } from '../../../components/web/marketing/LogoCloud'
import { Banner } from '../../../components/web/marketing/Banner'
import { NewsletterSignup } from '../../../components/web/marketing/NewsletterSignup'
import { Button } from '../../../components/web/ui/Button'
import { Sparkles } from 'lucide-react'
import { Showcase } from '../components/Showcase'

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
        description="Top-of-page hero with eyebrow, headline, subcopy, and CTAs."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <HeroSection
            eyebrow="Introducing Edifice"
            title="Build once. Stand forever."
            subtitle="A single source of truth for tokens, components, and patterns — optimized for AI agents and humans alike."
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
      </Showcase>

      <Showcase
        title="CTASection"
        source="components/web/marketing/CTASection.tsx"
        description="Bold call-to-action band (inverted variant shown)."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <CTASection
            title="Ready to start building?"
            subtitle="Pull Edifice into your next project in minutes."
            actions={
              <Button size="lg" variant="accent">
                Start now
              </Button>
            }
          />
        </div>
      </Showcase>

      <Showcase
        title="ContactSection"
        source="components/web/marketing/ContactSection.tsx"
        description="Intro copy plus a simple contact form."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <ContactSection
            subtitle="Have a question? Send us a note and we'll get back to you."
            onSubmit={() => {}}
          />
        </div>
      </Showcase>

      <Showcase
        title="PricingTable"
        source="components/web/marketing/PricingTable.tsx"
        description="Tiered pricing with features and a CTA each; one highlighted 'Popular' tier."
      >
        <PricingTable tiers={TIERS} />
      </Showcase>

      <Showcase
        title="FAQSection"
        source="components/web/marketing/FAQSection.tsx"
        description="Titled Q&A built on Accordion."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <FAQSection items={FAQ_ITEMS} subtitle="Everything you need to know." />
        </div>
      </Showcase>

      <Showcase
        title="Banner"
        source="components/web/marketing/Banner.tsx"
        description="Full-width announcement bar; three tones, optional icon, action, and dismiss."
      >
        <div className="flex flex-col gap-3 overflow-hidden rounded-xl border border-neutral-200">
          <Banner
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
          <Banner tone="info">Scheduled maintenance this Sunday at 02:00 UTC.</Banner>
          <Banner tone="neutral" onDismiss={() => {}}>
            We use cookies to improve your experience.
          </Banner>
        </div>
      </Showcase>

      <Showcase
        title="LogoCloud"
        source="components/web/marketing/LogoCloud.tsx"
        description="A 'trusted by' strip of partner logos; muted by default, brighten on hover."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <LogoCloud title="Trusted by teams at" logos={LOGOS} />
        </div>
      </Showcase>

      <Showcase
        title="NewsletterSignup"
        source="components/web/marketing/NewsletterSignup.tsx"
        description="Email-capture block with heading and inline form; calls onSubscribe(email)."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <NewsletterSignup
            title="Stay in the loop"
            subtitle="Get product updates and the occasional deep dive. No spam."
            note="Unsubscribe anytime."
            onSubscribe={() => {}}
          />
        </div>
      </Showcase>
    </div>
  )
}
