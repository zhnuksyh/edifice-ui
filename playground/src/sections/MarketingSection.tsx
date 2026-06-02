import { HeroSection } from '../../../components/web/marketing/HeroSection'
import { CTASection } from '../../../components/web/marketing/CTASection'
import { ContactSection } from '../../../components/web/marketing/ContactSection'
import { PricingTable } from '../../../components/web/marketing/PricingTable'
import type { PricingTier } from '../../../components/web/marketing/PricingTable'
import { FAQSection } from '../../../components/web/marketing/FAQSection'
import { Button } from '../../../components/web/ui/Button'
import { Showcase } from '../components/Showcase'

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
    </div>
  )
}
