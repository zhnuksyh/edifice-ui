import { useState } from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { PresetsSection } from './sections/PresetsSection'
import { TokensSection } from './sections/TokensSection'
import { ButtonsSection } from './sections/ButtonsSection'
import { UISection } from './sections/UISection'
import { ElementsSection } from './sections/ElementsSection'
import { DataSection } from './sections/DataSection'
import { DataDisplaySection } from './sections/DataDisplaySection'
import { FormsSection } from './sections/FormsSection'
import { LayoutSection } from './sections/LayoutSection'
import { MarketingSection } from './sections/MarketingSection'
import { LivePreview } from './live-preview/LivePreview'

interface NavItem {
  id: string
  label: string
  render: () => JSX.Element
  /** Render without the constrained container + heading (full-width pages). */
  fullBleed?: boolean
}

const SECTIONS: NavItem[] = [
  { id: 'presets', label: 'Presets', render: () => <PresetsSection /> },
  { id: 'tokens', label: 'Tokens', render: () => <TokensSection /> },
  { id: 'buttons', label: 'Buttons', render: () => <ButtonsSection /> },
  { id: 'ui', label: 'UI', render: () => <UISection /> },
  { id: 'elements', label: 'Elements', render: () => <ElementsSection /> },
  { id: 'data', label: 'Data', render: () => <DataSection /> },
  { id: 'data-display', label: 'Data Display', render: () => <DataDisplaySection /> },
  { id: 'forms', label: 'Forms', render: () => <FormsSection /> },
  { id: 'layout', label: 'Layout', render: () => <LayoutSection /> },
  { id: 'marketing', label: 'Marketing', render: () => <MarketingSection /> },
  {
    id: 'live-preview',
    label: 'Live Preview',
    render: () => <LivePreview />,
    fullBleed: true,
  },
]

/** Playground root: sidebar navigation + the active section. */
export function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0]

  return (
    <div className="flex min-h-screen bg-grey-11 text-grey-F0">
      {sidebarOpen && (
        <aside className="sticky top-0 h-screen w-56 shrink-0 border-r border-grey-2A bg-grey-1A">
          <div className="flex items-start justify-between border-b border-grey-2A px-5 py-5">
            <div>
              <p className="font-display text-lg font-bold">Edifice</p>
              <p className="text-xs text-grey-AA">Component Playground</p>
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Collapse sidebar"
              className="rounded-md p-1 text-grey-AA transition-colors hover:bg-grey-22 hover:text-grey-F0"
            >
              <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveId(section.id)}
                className={
                  'rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-fast ' +
                  (section.id === activeId
                    ? 'bg-grey-22 text-yellow'
                    : 'text-grey-AA hover:bg-grey-22 hover:text-grey-F0')
                }
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {!sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
          title="Open sidebar"
          className="fixed left-3 top-3 z-50 rounded-md border border-grey-2A bg-grey-1A/80 p-1.5 text-grey-AA backdrop-blur transition-colors hover:bg-grey-22 hover:text-grey-F0"
        >
          <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
        </button>
      )}

      <main className="flex-1 overflow-x-hidden">
        {active.fullBleed ? (
          active.render()
        ) : (
          <div className="mx-auto max-w-5xl px-8 py-10">
            <h2 className="mb-2 text-3xl font-bold">{active.label}</h2>
            {active.render()}
          </div>
        )}
      </main>
    </div>
  )
}
