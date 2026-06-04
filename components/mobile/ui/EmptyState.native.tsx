import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface EmptyStateProps extends ViewProps {
  /** Optional icon/illustration shown above the title. */
  icon?: ReactNode
  /** Heading. String or nodes. */
  title: ReactNode
  /** Supporting description. String or nodes. */
  description?: ReactNode
  /** Optional action(s) — e.g. a Button. */
  action?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * EmptyState (native) — a centered placeholder for "no data" views.
 *
 * Mirrors the web EmptyState props API. Use for empty lists, no results, and
 * first-run states. String title/description are wrapped in styled <Text>.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <View
      className={cn(
        'items-center justify-center gap-3 rounded-xl border border-dashed border-grey-2A px-6 py-12',
        className
      )}
      {...rest}
    >
      {icon != null && (
        <View className="h-12 w-12 items-center justify-center rounded-full bg-grey-22">
          {icon}
        </View>
      )}
      <View className="items-center">
        {typeof title === 'string' ? (
          <Text className="font-display text-center font-semibold text-text-primary">
            {title}
          </Text>
        ) : (
          title
        )}
        {description != null &&
          (typeof description === 'string' ? (
            <Text className="mt-1 max-w-sm text-center text-sm text-text-secondary">
              {description}
            </Text>
          ) : (
            description
          ))}
      </View>
      {action != null && <View className="mt-2">{action}</View>}
    </View>
  )
}
