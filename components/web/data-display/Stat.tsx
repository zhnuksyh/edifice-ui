import type { HTMLAttributes, ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '../../../utils/cn'

/** Diagonal trend arrow. */
function TrendArrow({ direction }: { direction: 'up' | 'down' }) {
  const Icon = direction === 'up' ? ArrowUpRight : ArrowDownRight
  return <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
}

export type StatTrend = 'up' | 'down' | 'neutral'
export type StatStyleVariant = 'elevated' | 'outlined' | 'ghost'

export interface StatProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Label above the value (e.g. 'Monthly revenue'). */
  label: ReactNode
  /** The headline metric (e.g. '$48,200', '1,204'). */
  value: ReactNode
  /**
   * Surface treatment. Defaults to 'elevated'.
   * - `elevated` — surface fill with a hairline border (the original).
   * - `outlined` — transparent fill, hairline border.
   * - `ghost` — transparent, no border or padding box.
   */
  styleVariant?: StatStyleVariant
  /** Optional delta text shown next to a trend arrow (e.g. '+12.5%'). */
  delta?: ReactNode
  /** Direction of the delta — colors the arrow/text. Defaults to 'neutral'. */
  trend?: StatTrend
  /** Optional icon shown top-right. */
  icon?: ReactNode
  /** Optional supporting line below the value. */
  hint?: ReactNode
}

/**
 * Stat — a single key metric: label, value, and an optional trend delta.
 *
 * Use in dashboards and overview grids. Trend colors the delta green (up),
 * red (down), or muted (neutral).
 */
export function Stat({
  label,
  value,
  styleVariant = 'elevated',
  delta,
  trend = 'neutral',
  icon,
  hint,
  className,
  ...rest
}: StatProps) {
  const trends: Record<StatTrend, string> = {
    up: 'text-success',
    down: 'text-danger',
    neutral: 'text-text-secondary',
  }

  // Per-treatment surface; the box padding stays on every treatment except
  // ghost, which drops the framed container entirely.
  const treatments: Record<StatStyleVariant, string> = {
    elevated: 'rounded-xl border border-grey-2A bg-grey-1A p-5',
    outlined: 'rounded-xl border border-grey-2A bg-transparent p-5',
    ghost: '',
  }

  const showArrow = trend === 'up' || trend === 'down'

  return (
    <div
      className={cn(treatments[styleVariant], className)}
      {...rest}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-text-secondary">{label}</p>
        {icon && <span className="text-text-muted">{icon}</span>}
      </div>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text-primary">
        {value}
      </p>
      {(delta || hint) && (
        <div className="mt-2 flex items-center gap-2 text-sm">
          {delta && (
            <span className={cn('inline-flex items-center gap-0.5 font-medium', trends[trend])}>
              {showArrow && <TrendArrow direction={trend === 'up' ? 'up' : 'down'} />}
              {delta}
            </span>
          )}
          {hint && <span className="text-text-muted">{hint}</span>}
        </div>
      )}
    </div>
  )
}
