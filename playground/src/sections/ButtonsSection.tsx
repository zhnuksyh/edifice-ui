import { Plus, ArrowRight, Settings } from 'lucide-react'
import { Button } from '../../../components/web/ui/Button'
import type {
  ButtonVariant,
  ButtonSize,
  ButtonStyleVariant,
} from '../../../components/web/ui/Button'
import { Showcase, Row } from '../components/Showcase'

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'accent',
  'ghost',
  'danger',
  'purple',
]
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']
// styleVariant derives its hue from variant; show it across the hue-bearing ones.
const STYLE_VARIANTS: ButtonStyleVariant[] = ['solid', 'soft', 'outline']
const STYLE_HUES: ButtonVariant[] = ['primary', 'danger', 'purple']

/** All Button variants, sizes, and states. */
export function ButtonsSection() {
  return (
    <Showcase
      title="Button"
      source="components/web/ui/Button.tsx"
      description="Six variants (hue) × an orthogonal styleVariant treatment, three sizes, plus disabled and full-width states."
    >
      <Row label="Variants">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Row>

      {STYLE_VARIANTS.map((styleVariant) => (
        <Row key={styleVariant} label={`styleVariant: ${styleVariant}`}>
          {STYLE_HUES.map((variant) => (
            <Button key={variant} variant={variant} styleVariant={styleVariant}>
              {variant}
            </Button>
          ))}
        </Row>
      ))}

      <Row label="Sizes">
        {SIZES.map((size) => (
          <Button key={size} size={size}>
            Size {size}
          </Button>
        ))}
      </Row>

      <Row label="Disabled">
        {VARIANTS.map((variant) => (
          <Button key={variant} variant={variant} disabled>
            {variant}
          </Button>
        ))}
      </Row>

      <Row label="With icons">
        <Button leftIcon={<Plus className="h-4 w-4" strokeWidth={2} />}>New item</Button>
        <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}>
          Continue
        </Button>
        <Button variant="ghost" iconOnly aria-label="Settings">
          <Settings className="h-4 w-4" strokeWidth={2} />
        </Button>
      </Row>

      <Row label="Loading">
        <Button loading>Saving</Button>
        <Button variant="ghost" loading>
          Loading
        </Button>
        <Button variant="danger" loading iconOnly aria-label="Deleting">
          <Plus className="h-4 w-4" />
        </Button>
      </Row>

      <Row label="Full width">
        <div className="w-full max-w-md">
          <Button fullWidth>Full-width button</Button>
        </div>
      </Row>
    </Showcase>
  )
}
