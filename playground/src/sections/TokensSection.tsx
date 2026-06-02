import { colors } from '../../../tokens/colors'
import { typography } from '../../../tokens/typography'
import { radius } from '../../../tokens/radius'
import { shadows } from '../../../tokens/shadows'
import { Showcase } from '../components/Showcase'
import { Swatch } from '../components/Swatch'

const GREY_NOTES: Record<string, string> = {
  '0A': 'deepest bg',
  '11': 'primary bg',
  '1A': 'surface',
  '22': 'elevated',
  '2A': 'borders',
  '33': 'subtle borders',
  '44': 'muted',
  '66': 'placeholder',
  '88': 'secondary text',
  AA: 'tertiary text',
  CC: 'disabled text',
  F0: 'primary text',
}

const ACCENTS = ['yellow', 'red', 'cyan', 'green', 'purple'] as const
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
      <Showcase
        title="Grey scale"
        source="tokens/colors.ts"
        description="The grey-first palette — the hero. Lightest value is the deepest background."
      >
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {Object.entries(colors.grey).map(([key, value]) => (
            <Swatch key={key} name={key} value={value} note={GREY_NOTES[key]} />
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Accents"
        source="tokens/colors.ts"
        description="Minimal use only — never dominant. Each accent pairs a vivid value with a dark tint."
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-5">
          {ACCENTS.map((accent) => (
            <div key={accent} className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-wide text-grey-AA">
                {accent}
              </p>
              <Swatch name="DEFAULT" value={colors[accent].DEFAULT} />
              <Swatch name="tint" value={colors[accent].tint} />
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Semantic"
        source="tokens/colors.ts"
        description="Mapped to accents: success→green, danger→red, warning→yellow, info→cyan."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(['success', 'danger', 'warning', 'info'] as const).map((name) => (
            <Swatch key={name} name={name} value={colors[name].DEFAULT} />
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Typography scale"
        source="tokens/typography.ts"
        description="Display: Montserrat · Body: Poppins · Rounded: Fredoka · Mono: JetBrains Mono."
      >
        <div className="mb-6 flex flex-col gap-1 font-mono text-xs text-grey-AA">
          <span style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-base text-grey-F0">
            Montserrat — display / headings
          </span>
          <span style={{ fontFamily: "'Poppins', sans-serif" }} className="text-base text-grey-F0">
            Poppins — body copy
          </span>
          <span style={{ fontFamily: "'Fredoka', sans-serif" }} className="text-base text-grey-F0">
            Fredoka — rounded / playful
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }} className="text-base text-grey-F0">
            JetBrains Mono — code
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {FONT_SIZE_ORDER.map((size) => (
            <div key={size} className="flex items-baseline gap-4">
              <code className="w-12 shrink-0 font-mono text-xs text-grey-AA">
                {size}
              </code>
              <span style={{ fontSize: typography.fontSize[size] }}>
                The quick brown fox
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
                className="h-16 w-16 border border-grey-33 bg-grey-22"
                style={{ borderRadius: value }}
              />
              <code className="font-mono text-xs text-grey-AA">
                {name} · {value}
              </code>
            </div>
          ))}
        </div>
      </Showcase>

      <Showcase
        title="Shadows"
        source="tokens/shadows.ts"
        description="Dark-aware — deeper and higher-opacity so elevation reads on near-black."
      >
        <div className="flex flex-wrap gap-8 bg-grey-11 p-8">
          {Object.entries(shadows).map(([name, value]) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div
                className="h-16 w-16 rounded-lg bg-grey-22"
                style={{ boxShadow: value }}
              />
              <code className="font-mono text-xs text-grey-AA">{name}</code>
            </div>
          ))}
        </div>
      </Showcase>
    </div>
  )
}
