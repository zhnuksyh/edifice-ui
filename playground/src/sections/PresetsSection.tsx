import { presets } from '../../../presets'
import { radius } from '../../../tokens/radius'
import type { Preset } from '../../../presets'
import { Showcase } from '../components/Showcase'

/** Compact card summarizing a preset's tokens, rendered in its own look. */
function PresetCard({ preset }: { preset: Preset }) {
  const corner = radius[preset.radius]
  return (
    <div
      style={{
        backgroundColor: preset.colors.surface,
        color: preset.colors.text,
        borderRadius: corner,
        border: `1px solid ${preset.colors.border}`,
        padding: 18,
      }}
    >
      <div className="flex items-baseline justify-between">
        <span
          style={{ fontFamily: `'${preset.fonts.display}', sans-serif` }}
          className="text-base font-semibold"
        >
          {preset.name}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: preset.colors.accentColor,
            color: preset.colors.background,
          }}
        >
          {preset.colors.accent}
        </span>
      </div>
      <p
        className="mt-2 text-xs"
        style={{ color: preset.colors.secondaryText }}
      >
        {preset.description}
      </p>
      <dl
        className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px]"
        style={{ color: preset.colors.secondaryText }}
      >
        <dt>radius</dt>
        <dd className="text-right">
          {preset.radius} ({corner})
        </dd>
        <dt>density</dt>
        <dd className="text-right">{preset.density}</dd>
        <dt>display</dt>
        <dd className="text-right">{preset.fonts.display}</dd>
        <dt>body</dt>
        <dd className="text-right">{preset.fonts.body}</dd>
      </dl>
    </div>
  )
}

/** Summary cards for every preset, each rendered in its own look. */
export function PresetsSection() {
  return (
    <Showcase
      title="All presets"
      source="presets/index.ts"
      description="Named token bundles. Each card renders in its own background, surface, accent, fonts, and radius."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {presets.map((preset) => (
          <PresetCard key={preset.name} preset={preset} />
        ))}
      </div>
    </Showcase>
  )
}
