import { Navbar } from '../../../components/web/layout/Navbar'
import { Footer } from '../../../components/web/layout/Footer'
import { Container } from '../../../components/web/layout/Container'
import { Section } from '../../../components/web/layout/Section'
import { Stack } from '../../../components/web/layout/Stack'
import { Grid } from '../../../components/web/layout/Grid'
import { AspectRatio } from '../../../components/web/layout/AspectRatio'
import { Sidebar } from '../../../components/web/layout/Sidebar'
import { Button } from '../../../components/web/ui/Button'
import { Home, Inbox, Settings, BarChart3 } from 'lucide-react'
import { Showcase, Row } from '../components/Showcase'

const SIDEBAR_GROUPS = [
  {
    id: 'main',
    label: 'Workspace',
    items: [
      { id: 'home', label: 'Home', href: '#', icon: <Home className="h-4 w-4" strokeWidth={1.75} />, active: true },
      { id: 'inbox', label: 'Inbox', href: '#', icon: <Inbox className="h-4 w-4" strokeWidth={1.75} /> },
      { id: 'reports', label: 'Reports', href: '#', icon: <BarChart3 className="h-4 w-4" strokeWidth={1.75} /> },
    ],
  },
  {
    id: 'system',
    items: [
      { id: 'settings', label: 'Settings', href: '#', icon: <Settings className="h-4 w-4" strokeWidth={1.75} /> },
    ],
  },
]

const Cell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center rounded-lg border border-grey-2A bg-grey-22 py-4 text-sm text-text-secondary">
    {children}
  </div>
)

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

      <Showcase
        title="Stack"
        source="components/web/layout/Stack.tsx"
        description="Flexbox primitive — row or column with a gap, plus align/justify."
      >
        <Row label="Column (default)">
          <div className="w-48">
            <Stack gap="sm">
              <Cell>One</Cell>
              <Cell>Two</Cell>
              <Cell>Three</Cell>
            </Stack>
          </div>
        </Row>
        <Row label="Row, justify between, center">
          <div className="w-full max-w-md">
            <Stack direction="row" justify="between" align="center">
              <Cell>Left</Cell>
              <Cell>Middle</Cell>
              <Cell>Right</Cell>
            </Stack>
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="Grid"
        source="components/web/layout/Grid.tsx"
        description="Responsive CSS grid — base cols plus per-breakpoint counts."
      >
        <Grid cols={2} smCols={3} lgCols={4} gap="md">
          {Array.from({ length: 8 }, (_, i) => (
            <Cell key={i}>{i + 1}</Cell>
          ))}
        </Grid>
      </Showcase>

      <Showcase
        title="AspectRatio"
        source="components/web/layout/AspectRatio.tsx"
        description="Constrains media to a fixed ratio so layout doesn't shift on load."
      >
        <Row label="16:9 · 1:1 · 3:4">
          <div className="w-40">
            <AspectRatio ratio="video">
              <div className="flex items-center justify-center bg-grey-22 text-xs text-text-secondary">16:9</div>
            </AspectRatio>
          </div>
          <div className="w-28">
            <AspectRatio ratio="square">
              <div className="flex items-center justify-center bg-grey-22 text-xs text-text-secondary">1:1</div>
            </AspectRatio>
          </div>
          <div className="w-28">
            <AspectRatio ratio="portrait">
              <div className="flex items-center justify-center bg-grey-22 text-xs text-text-secondary">3:4</div>
            </AspectRatio>
          </div>
        </Row>
      </Showcase>

      <Showcase
        title="Sidebar"
        source="components/web/layout/Sidebar.tsx"
        description="Vertical navigation rail with grouped, active-aware items and header/footer slots."
      >
        <div className="h-80 overflow-hidden rounded-xl border border-neutral-200">
          <Sidebar
            header={<p className="font-display font-bold text-text-primary">Edifice</p>}
            groups={SIDEBAR_GROUPS}
            footer={<p className="text-xs text-text-muted">v0.1.0</p>}
          />
        </div>
      </Showcase>
    </div>
  )
}
