import { Navbar } from '../../../components/web/layout/Navbar'
import { Footer } from '../../../components/web/layout/Footer'
import { Container } from '../../../components/web/layout/Container'
import { Section } from '../../../components/web/layout/Section'
import { Button } from '../../../components/web/ui/Button'
import { Showcase } from '../components/Showcase'

const NAV_LINKS = [
  { label: 'Home', href: '#', active: true },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
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
      { label: 'Contact', href: '#' },
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

/** Navbar and Footer, framed in bordered containers (sticky disabled). */
export function LayoutSection() {
  return (
    <div>
      <Showcase
        title="Navbar"
        source="components/web/layout/Navbar.tsx"
        description="Brand, links, and an actions slot. Sticky disabled here for framing."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <Navbar
            brand="Edifice"
            links={NAV_LINKS}
            sticky={false}
            actions={
              <>
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button size="sm">Get started</Button>
              </>
            }
          />
        </div>
      </Showcase>

      <Showcase
        title="Footer"
        source="components/web/layout/Footer.tsx"
        description="Brand blurb plus grouped link columns and a bottom bar."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <Footer
            brand={<p className="text-sm">Edifice — build once, stand forever.</p>}
            columns={FOOTER_COLUMNS}
          />
        </div>
      </Showcase>

      <Showcase
        title="PageShell"
        source="components/web/layout/PageShell.tsx"
        description="Composes navbar + main + footer into a full-height column. See it in action by composing Navbar and Footer above; here we note its role rather than render a nested full-height page."
      >
        <p className="text-sm text-text-secondary">
          <code className="font-mono text-xs">PageShell</code> wraps a whole page:
          it renders a <code className="font-mono text-xs">navbar</code> prop, your
          content (optionally constrained to a centered container), and a{' '}
          <code className="font-mono text-xs">footer</code> prop in a min-height
          screen column.
        </p>
      </Showcase>

      <Showcase
        title="Container"
        source="components/web/layout/Container.tsx"
        description="Centers content at a max width with responsive horizontal padding."
      >
        <div className="rounded-xl border border-grey-2A bg-grey-1A">
          <Container size="md" className="border-x border-dashed border-grey-44 py-6">
            <p className="text-center text-sm text-text-secondary">
              Centered, max-width container (dashed edges show the bounds).
            </p>
          </Container>
        </div>
      </Showcase>

      <Showcase
        title="Section"
        source="components/web/layout/Section.tsx"
        description="Full-width band with vertical rhythm and alternating surface tone."
      >
        <div className="overflow-hidden rounded-xl border border-neutral-200">
          <Section spacing="sm" tone="background">
            <p className="text-center text-sm text-text-secondary">Section · background tone</p>
          </Section>
          <Section spacing="sm" tone="surface" bordered>
            <p className="text-center text-sm text-text-secondary">Section · surface tone, bordered</p>
          </Section>
        </div>
      </Showcase>
    </div>
  )
}
