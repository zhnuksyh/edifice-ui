import { useState } from 'react'
import { TokensSection } from './sections/TokensSection'
import { ButtonsSection } from './sections/ButtonsSection'
import { UISection } from './sections/UISection'
import { FormsSection } from './sections/FormsSection'
import { LayoutSection } from './sections/LayoutSection'
import { MarketingSection } from './sections/MarketingSection'

interface NavItem {
  id: string
  label: string
  render: () => JSX.Element
}

const SECTIONS: NavItem[] = [
  { id: 'tokens', label: 'Tokens', render: () => <TokensSection /> },
  { id: 'buttons', label: 'Buttons', render: () => <ButtonsSection /> },
  { id: 'ui', label: 'UI', render: () => <UISection /> },
  { id: 'forms', label: 'Forms', render: () => <FormsSection /> },
  { id: 'layout', label: 'Layout', render: () => <LayoutSection /> },
  { id: 'marketing', label: 'Marketing', render: () => <MarketingSection /> },
]

/** Playground root: sidebar navigation + the active section. */
export function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0]

  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <aside className="sticky top-0 h-screen w-56 shrink-0 border-r border-neutral-200 bg-surface">
        <div className="border-b border-neutral-200 px-5 py-5">
          <p className="text-lg font-bold">Edifice</p>
          <p className="text-xs text-text-muted">Component Playground</p>
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
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-text-secondary hover:bg-neutral-100')
              }
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <h2 className="mb-2 text-3xl font-bold">{active.label}</h2>
          {active.render()}
        </div>
      </main>
    </div>
  )
}
