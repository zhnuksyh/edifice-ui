import { presets } from '../../../presets'
import { radius } from '../../../tokens/radius'
import type { Preset } from '../../../presets'
import { Showcase } from '../components/Showcase'

/** Visual preview card for one preset, rendered in its own colors/fonts. */
function PresetCard({ preset }: { preset: Preset }) {
  const corner = radius[preset.radius]
  const pad =
    preset.density === 'spacious' ? 28 : preset.density === 'compact' ? 12 : 20

  return (
    <div
      className="flex flex-col gap-4 border border-grey-2A"
      style={{
        backgroundColor: preset.colors.background,
        color: preset.colors.text,
        borderRadius: corner,
        padding: pad,
      }}
    >
      <div className="flex items-baseline justify-between">
        <span
          style={{ fontFamily: `'${preset.fonts.display}', sans-serif` }}
          className="text-lg font-semibold"
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
        style={{ fontFamily: `'${preset.fonts.body}', sans-serif` }}
        className="text-sm opacity-80"
      >
        {preset.description}
      </p>

      {/* Surface sample */}
      <div
        style={{
          backgroundColor: preset.colors.surface,
          borderRadius: corner,
          padding: pad,
        }}
        className="flex flex-col gap-3"
      >
        <span
          style={{ fontFamily: `'${preset.fonts.display}', sans-serif` }}
          className="text-base font-semibold"
        >
          Surface
        </span>
        <button
          type="button"
          style={{
            backgroundColor: preset.colors.accentColor,
            color: preset.colors.background,
            borderRadius: corner,
            fontFamily: `'${preset.fonts.body}', sans-serif`,
          }}
          className="self-start px-4 py-2 text-sm font-medium"
        >
          Accent button
        </button>
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px] opacity-70">
        <dt>radius</dt>
        <dd className="text-right">{preset.radius} ({corner})</dd>
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

/** Shows all three presets side by side, each in its own look. */
export function PresetsSection() {
  return (
    <Showcase
      title="Presets"
      source="presets/"
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
