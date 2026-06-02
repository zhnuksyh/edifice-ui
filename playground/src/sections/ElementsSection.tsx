import { Badge } from '../../../components/web/ui/Badge'
import type { BadgeVariant } from '../../../components/web/ui/Badge'
import { Avatar } from '../../../components/web/ui/Avatar'
import { Spinner } from '../../../components/web/ui/Spinner'
import type { SpinnerSize } from '../../../components/web/ui/Spinner'
import { Tooltip } from '../../../components/web/ui/Tooltip'
import { Tabs } from '../../../components/web/ui/Tabs'
import { Button } from '../../../components/web/ui/Button'
import { Showcase, Row } from '../components/Showcase'

const BADGE_VARIANTS: BadgeVariant[] = [
  'neutral',
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'purple',
]
const SPINNER_SIZES: SpinnerSize[] = ['sm', 'md', 'lg']

const TAB_ITEMS = [
  { value: 'overview', label: 'Overview', content: 'The overview panel content.' },
  { value: 'specs', label: 'Specs', content: 'Technical specifications go here.' },
  { value: 'reviews', label: 'Reviews', content: 'Customer reviews go here.' },
  { value: 'disabled', label: 'Disabled', content: 'Unreachable.', disabled: true },
]

/** Badge, Avatar, Spinner, Tooltip, and Tabs. */
export function ElementsSection() {
  return (
    <div>
      <Showcase
        title="Badge"
        source="components/web/ui/Badge.tsx"
        description="Small label for statuses, counts, and tags. Six tones, two sizes, optional pill."
      >
        <Row label="Variants">
          {BADGE_VARIANTS.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ))}
        </Row>
        <Row label="Pill + sizes">
          <Badge pill variant="primary">
            Pill
          </Badge>
          <Badge size="sm" variant="success">
            small
          </Badge>
          <Badge size="md" variant="info">
            medium
          </Badge>
        </Row>
      </Showcase>

      <Showcase
        title="Avatar"
        source="components/web/ui/Avatar.tsx"
        description="User image with an initials fallback, and a placeholder when neither is available."
      >
        <Row label="Image (sizes)">
          {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Avatar
              key={size}
              size={size}
              src="https://i.pravatar.cc/100?img=12"
              alt="Sample user"
            />
          ))}
        </Row>
        <Row label="Initials fallback">
          <Avatar name="Ada Lovelace" />
          <Avatar name="Grace Hopper" size="lg" />
        </Row>
        <Row label="Placeholder (no src or name)">
          <Avatar />
        </Row>
      </Showcase>

      <Showcase
        title="Spinner"
        source="components/web/ui/Spinner.tsx"
        description="Animated loading indicator in three sizes and tones."
      >
        <Row label="Sizes">
          {SPINNER_SIZES.map((size) => (
            <Spinner key={size} size={size} />
          ))}
        </Row>
        <Row label="Tones">
          <Spinner tone="primary" />
          <Spinner tone="neutral" />
          <Spinner tone="purple" />
          <Button>
            <Spinner size="sm" tone="inverse" />
            <span className="ml-2">Loading…</span>
          </Button>
        </Row>
      </Showcase>

      <Showcase
        title="Tooltip"
        source="components/web/ui/Tooltip.tsx"
        description="Shows on hover and keyboard focus. Four placements."
      >
        <Row>
          {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
            <Tooltip
              key={placement}
              placement={placement}
              content={`Tooltip on ${placement}`}
            >
              <Button variant="ghost">{placement}</Button>
            </Tooltip>
          ))}
        </Row>
      </Showcase>

      <Showcase
        title="Tabs"
        source="components/web/ui/Tabs.tsx"
        description="Switch between panels (uncontrolled here). Supports a disabled tab."
      >
        <div className="max-w-lg">
          <Tabs items={TAB_ITEMS} />
        </div>
      </Showcase>
    </div>
  )
}
