import { HeroSection } from '../../../components/web/marketing/HeroSection'
import { CTASection } from '../../../components/web/marketing/CTASection'
import { ContactSection } from '../../../components/web/marketing/ContactSection'
import { Button } from '../../../components/web/ui/Button'
import { Showcase } from '../components/Showcase'

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
    </div>
  )
}
