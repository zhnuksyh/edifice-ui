import { colors } from '../../../tokens/colors'
import { typography } from '../../../tokens/typography'
import { spacing } from '../../../tokens/spacing'
import { radius } from '../../../tokens/radius'
import { shadows } from '../../../tokens/shadows'
import { Showcase } from '../components/Showcase'
import { Swatch } from '../components/Swatch'

const SCALE_GROUPS = ['primary', 'secondary', 'accent', 'neutral'] as const
const SEMANTIC_GROUPS = ['success', 'warning', 'danger', 'info'] as const
const FONT_SIZE_ORDER = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const

/** Showcases the design tokens, read straight from the token source. */
export function TokensSection() {
  return (
    <div>
      <Showcase title="Color scales" source="tokens/colors.ts">
        {SCALE_GROUPS.map((group) => (
          <div key={group} className="mb-6 last:mb-0">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
              {group}
            </p>
            <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
              {Object.entries(colors[group]).map(([shade, value]) => (
                <Swatch key={shade} name={shade} value={value} />
              ))}
            </div>
          </div>
        ))}
      </Showcase>

      <Showcase title="Semantic colors" source="tokens/colors.ts">
        {SEMANTIC_GROUPS.map((group) => (
          <div key={group} className="mb-6 last:mb-0">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
              {group}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(colors[group]).map(([variant, value]) => (
                <Swatch key={variant} name={variant} value={value} />
              ))}
            </div>
          </div>
        ))}
      </Showcase>

      <Showcase title="Typography scale" source="tokens/typography.ts">
        <div className="flex flex-col gap-3">
          {FONT_SIZE_ORDER.map((size) => (
            <div key={size} className="flex items-baseline gap-4">
              <code className="w-12 shrink-0 font-mono text-xs text-text-muted">
                {size}
              </code>
              <span style={{ fontSize: typography.fontSize[size] }}>
                The quick brown fox
              </span>
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase title="Spacing scale" source="tokens/spacing.ts">
        <div className="flex flex-col gap-2">
          {(['1', '2', '4', '6', '8', '12', '16', '24'] as const).map((key) => (
            <div key={key} className="flex items-center gap-4">
              <code className="w-10 shrink-0 font-mono text-xs text-text-muted">
                {key}
              </code>
              <div
                className="h-4 rounded bg-primary-400"
                style={{ width: spacing[key] }}
              />
              <span className="font-mono text-xs text-text-muted">
                {spacing[key]}
              </span>
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase title="Radius" source="tokens/radius.ts">
        <div className="flex flex-wrap gap-6">
          {Object.entries(radius).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 border border-neutral-300 bg-primary-100"
                style={{ borderRadius: value }}
              />
              <code className="font-mono text-xs text-text-muted">{name}</code>
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase title="Shadows" source="tokens/shadows.ts">
        <div className="flex flex-wrap gap-8 bg-neutral-50 p-6">
          {Object.entries(shadows)
            .filter(([name]) => name !== 'none')
            .map(([name, value]) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div
                  className="h-16 w-16 rounded-lg bg-surface"
                  style={{ boxShadow: value }}
                />
                <code className="font-mono text-xs text-text-muted">{name}</code>
              </div>
            ))}
        </div>
      </Showcase>
    </div>
  )
}
