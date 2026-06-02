import { useState } from 'react'
import { presets } from '../../../presets'
import { radius } from '../../../tokens/radius'
import { shadows } from '../../../tokens/shadows'
import type { Preset } from '../../../presets'
import { Showcase } from '../components/Showcase'

const DENSITY_PAD: Record<Preset['density'], number> = {
  compact: 12,
  normal: 20,
  spacious: 28,
}

/** Live sandbox that renders sample UI in the chosen preset's look. */
function PresetSandbox({ preset }: { preset: Preset }) {
  const corner = radius[preset.radius]
  const pad = DENSITY_PAD[preset.density]
  const { colors, fonts } = preset

  return (
    <div
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        borderRadius: corner,
        border: `1px solid ${colors.border}`,
        padding: pad * 1.5,
        fontFamily: `'${fonts.body}', sans-serif`,
      }}
    >
      <p
        style={{
          fontFamily: `'${fonts.display}', sans-serif`,
          fontSize: 22,
          fontWeight: 600,
        }}
      >
        {preset.name}
      </p>
      <p style={{ color: colors.secondaryText, fontSize: 13, marginTop: 4 }}>
        {preset.description}
      </p>

      {/* Elevated panel (modal/dropdown surface) */}
      <div
        style={{
          backgroundColor: colors.elevated,
          border: `1px solid ${colors.border}`,
          borderRadius: corner,
          padding: pad,
          marginTop: pad,
          boxShadow: shadows.lg,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              backgroundColor: colors.accentColor,
              color: colors.background,
              borderRadius: corner,
              padding: '2px 8px',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {colors.accent}
          </span>
          <span style={{ color: colors.secondaryText, fontSize: 12 }}>
            elevated surface
          </span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: pad }}>
          <button
            type="button"
            style={{
              backgroundColor: colors.accentColor,
              color: colors.background,
              borderRadius: corner,
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: `'${fonts.body}', sans-serif`,
            }}
          >
            Primary
          </button>
          <button
            type="button"
            style={{
              backgroundColor: 'transparent',
              color: colors.text,
              border: `1px solid ${colors.border}`,
              borderRadius: corner,
              padding: '8px 14px',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: `'${fonts.body}', sans-serif`,
            }}
          >
            Secondary
          </button>
        </div>

        <input
          readOnly
          value="input field"
          style={{
            backgroundColor: colors.surface,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: corner,
            padding: '8px 12px',
            fontSize: 13,
            marginTop: pad,
            width: '100%',
            fontFamily: `'${fonts.body}', sans-serif`,
          }}
        />
      </div>
    </div>
  )
}

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

/** Interactive preset switcher with a live sandbox, plus summary cards. */
export function PresetsSection() {
  const [activeName, setActiveName] = useState(presets[0].name)
  const active = presets.find((p) => p.name === activeName) ?? presets[0]

  return (
    <div>
      <Showcase
        title="Live preview"
        source="presets/"
        description="Pick a preset to apply its background, surface, accent, fonts, radius, and density to the sandbox below."
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-grey-2A bg-grey-1A p-1">
          <span className="px-2 text-xs font-medium uppercase tracking-wide text-grey-AA">
            Preset:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setActiveName(preset.name)}
              className={
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-fast ' +
                (preset.name === active.name
                  ? 'bg-grey-2A text-grey-F0'
                  : 'text-grey-AA hover:bg-grey-22 hover:text-grey-F0')
              }
            >
              {preset.name}
            </button>
          ))}
        </div>

        <PresetSandbox preset={active} />
      </Showcase>

      <Showcase
        title="All presets"
        source="presets/index.ts"
        description="Each card renders in its own background, surface, accent, fonts, and radius."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {presets.map((preset) => (
            <PresetCard key={preset.name} preset={preset} />
          ))}
        </div>
      </Showcase>
    </div>
  )
}
