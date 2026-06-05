import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../ui/Button'

export type PricingStyleVariant = 'cards' | 'bordered' | 'minimal'

export interface PricingTier {
  /** Plan name. */
  name: string
  /** Price text (e.g. '$19'). */
  price: string
  /** Billing period suffix (e.g. '/mo'). */
  period?: string
  /** Short plan description. */
  description?: string
  /** Feature bullets. */
  features: string[]
  /** CTA label. */
  cta: string
  /** Called when the tier CTA is clicked. */
  onSelect?: () => void
  /** Emphasize this tier (accent border + 'Popular' badge). */
  highlighted?: boolean
}

export interface PricingTableProps extends HTMLAttributes<HTMLDivElement> {
  /** The pricing tiers to render. */
  tiers: PricingTier[]
  /**
   * Visual layout style. Defaults to 'cards'.
   * - `cards` — separated, rounded, shadowed cards in a grid.
   * - `bordered` — tiers joined into one panel with shared hairline borders.
   * - `minimal` — borderless columns separated by thin dividers.
   */
  styleVariant?: PricingStyleVariant
}

/**
 * PricingTable — a row of pricing tiers with features and a CTA each.
 *
 * The `highlighted` tier gets an accent border and a "Popular" badge to draw
 * the eye, in line with accent-restraint (one highlighted tier). Three
 * `styleVariant` looks share one API: cards (default), bordered, and minimal.
 */
export function PricingTable({
  tiers,
  styleVariant = 'cards',
  className,
  ...rest
}: PricingTableProps) {
  const cols = tiers.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'

  // bordered: one joined panel; minimal: thin dividers between columns.
  const wrapper =
    styleVariant === 'bordered'
      ? 'overflow-hidden rounded-xl border border-grey-2A md:divide-x divide-grey-2A'
      : styleVariant === 'minimal'
        ? 'md:divide-x divide-grey-2A'
        : 'gap-6'

  const tierBase =
    styleVariant === 'cards'
      ? 'rounded-xl border bg-surface shadow-sm'
      : 'border-0'

  return (
    <div className={cn('grid', cols, wrapper, className)} {...rest}>
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            'relative flex flex-col p-6',
            tierBase,
            styleVariant === 'cards' &&
              (tier.highlighted
                ? 'border-yellow shadow-lg'
                : 'border-grey-2A'),
            styleVariant !== 'cards' && tier.highlighted && 'bg-grey-1A'
          )}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-6 rounded-full bg-yellow px-3 py-0.5 text-xs font-medium text-text-inverse">
              Popular
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-text-primary">
            {tier.name}
          </h3>
          {tier.description && (
            <p className="mt-1 text-sm text-text-secondary">{tier.description}</p>
          )}
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-bold text-text-primary">
              {tier.price}
            </span>
            {tier.period && (
              <span className="text-sm text-text-muted">{tier.period}</span>
            )}
          </div>
          <ul className="mt-6 flex flex-1 flex-col gap-2.5">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <CheckIcon />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button
              variant={tier.highlighted ? 'primary' : 'secondary'}
              fullWidth
              onClick={tier.onSelect}
            >
              {tier.cta}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

function CheckIcon(): ReactNode {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
