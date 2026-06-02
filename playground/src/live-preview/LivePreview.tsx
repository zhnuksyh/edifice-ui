import { useState } from 'react'
import { LandingPage } from './LandingPage'
import { SwitcherPanel } from './SwitcherPanel'
import { DEFAULT_STATE, type LivePreviewState } from './config'
import './theme.css'

/**
 * Live Preview — a static landing page built from Edifice components, with a
 * floating switcher that swaps component variants, the preset theme, and the
 * radius scale live (no reload). Playground-only; never shipped.
 */
export function LivePreview() {
  const [state, setState] = useState<LivePreviewState>(DEFAULT_STATE)
  const [panelOpen, setPanelOpen] = useState(true)

  const update = (next: Partial<LivePreviewState>) =>
    setState((prev) => ({ ...prev, ...next }))

  return (
    <div
      className="lp-root min-h-screen"
      data-preset={state.preset}
      data-radius={state.radius}
    >
      <LandingPage state={state} />
      <SwitcherPanel
        state={state}
        onChange={update}
        open={panelOpen}
        onToggle={() => setPanelOpen((o) => !o)}
      />
    </div>
  )
}
