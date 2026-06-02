import { SlidersHorizontal, X, Check } from 'lucide-react'
import {
  BUTTON_STYLES,
  HERO_LAYOUTS,
  NAVBAR_STYLES,
  PRESETS,
  RADIUS_LEVELS,
  type LivePreviewState,
} from './config'

interface SwitcherPanelProps {
  state: LivePreviewState
  onChange: (next: Partial<LivePreviewState>) => void
  open: boolean
  onToggle: () => void
}

const RADIUS_LABEL: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

/** A labeled group of mutually-exclusive option chips. */
function OptionGroup<T extends string>({
  label,
  options,
  value,
  format,
  onSelect,
}: {
  label: string
  options: readonly T[]
  value: T
  format?: (v: T) => string
  onSelect: (v: T) => void
}) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-grey-88">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === value
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={
                'inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-fast ' +
                (active
                  ? 'bg-purple text-white'
                  : 'bg-grey-22 text-grey-AA hover:bg-grey-2A hover:text-grey-F0')
              }
            >
              {active && <Check className="h-3 w-3" strokeWidth={2.5} />}
              {format ? format(opt) : opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Floating, collapsible component-switcher panel for the Live Preview page. */
export function SwitcherPanel({
  state,
  onChange,
  open,
  onToggle,
}: SwitcherPanelProps) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label="Open controls"
        className="fixed right-0 top-24 z-50 flex items-center gap-2 rounded-l-lg border border-r-0 border-grey-2A bg-grey-1A px-3 py-2 text-sm font-medium text-grey-F0 shadow-lg transition-colors hover:bg-grey-22"
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
        Controls
      </button>
    )
  }

  return (
    <aside className="fixed right-4 top-24 z-50 max-h-[80vh] w-72 overflow-auto rounded-xl border border-grey-2A bg-grey-1A p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 font-display text-sm font-semibold text-grey-F0">
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
          Live controls
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Collapse controls"
          className="rounded-md p-1 text-grey-AA transition-colors hover:bg-grey-22 hover:text-grey-F0"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>

      <OptionGroup
        label="Button style"
        options={BUTTON_STYLES}
        value={state.buttonStyle}
        onSelect={(v) => onChange({ buttonStyle: v })}
      />
      <OptionGroup
        label="Navbar style"
        options={NAVBAR_STYLES}
        value={state.navbarStyle}
        onSelect={(v) => onChange({ navbarStyle: v })}
      />
      <OptionGroup
        label="Hero layout"
        options={HERO_LAYOUTS}
        value={state.heroLayout}
        onSelect={(v) => onChange({ heroLayout: v })}
      />
      <OptionGroup
        label="Preset (theme)"
        options={PRESETS}
        value={state.preset}
        onSelect={(v) => onChange({ preset: v })}
      />
      <OptionGroup
        label="Border radius"
        options={RADIUS_LEVELS}
        value={state.radius}
        format={(v) => RADIUS_LABEL[v]}
        onSelect={(v) => onChange({ radius: v })}
      />

      <div className="mt-4 border-t border-grey-2A pt-3 text-[11px] text-grey-88">
        Design experimentation only — not shipped to any project.
      </div>
    </aside>
  )
}
