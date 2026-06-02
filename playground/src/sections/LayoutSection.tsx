import { Navbar } from '../../../components/web/layout/Navbar'
import { Footer } from '../../../components/web/layout/Footer'
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
    </div>
  )
}
