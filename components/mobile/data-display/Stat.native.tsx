import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type StatTrend = 'up' | 'down' | 'neutral'

export interface StatProps extends ViewProps {
  /** Label above the value (e.g. 'Monthly revenue'). String or nodes. */
  label: ReactNode
  /** The headline metric (e.g. '$48,200', '1,204'). String or nodes. */
  value: ReactNode
  /** Optional delta text shown next to a trend arrow (e.g. '+12.5%'). */
  delta?: ReactNode
  /** Direction of the delta — colors the arrow/text. Defaults to 'neutral'. */
  trend?: StatTrend
  /** Optional icon shown top-right. */
  icon?: ReactNode
  /** Optional supporting line below the value. String or nodes. */
  hint?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Stat (native) — a single key metric: label, value, and an optional trend.
 *
 * Mirrors the web Stat props API. The trend arrow uses a ▲/▼ glyph (RN has no
 * inline SVG here) and colors the delta green (up), red (down), or muted
 * (neutral). String label/value/delta/hint are wrapped in styled <Text>.
 */
export function Stat({
  label,
  value,
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

  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : ''

  return (
    <View
      className={cn('rounded-xl border border-grey-2A bg-grey-1A p-5', className)}
      {...rest}
    >
      <View className="flex-row items-start justify-between gap-3">
        {typeof label === 'string' ? (
          <Text className="text-sm font-medium text-text-secondary">{label}</Text>
        ) : (
          label
        )}
        {icon != null && <View className="text-text-muted">{icon}</View>}
      </View>

      {typeof value === 'string' ? (
        <Text className="mt-2 font-display text-3xl font-semibold text-text-primary">
          {value}
        </Text>
      ) : (
        <View className="mt-2">{value}</View>
      )}

      {(delta != null || hint != null) && (
        <View className="mt-2 flex-row items-center gap-2">
          {delta != null && (
            <Text className={cn('text-sm font-medium', trends[trend])}>
              {arrow ? `${arrow} ` : ''}
              {delta}
            </Text>
          )}
          {hint != null &&
            (typeof hint === 'string' ? (
              <Text className="text-sm text-text-muted">{hint}</Text>
            ) : (
              hint
            ))}
        </View>
      )}
    </View>
  )
}
