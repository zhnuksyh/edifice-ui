import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends ViewProps {
  /** Tone. Defaults to 'neutral'. */
  variant?: BadgeVariant
  /** Size preset. Defaults to 'md'. */
  size?: BadgeSize
  /** Render as a pill (fully rounded). */
  pill?: boolean
  /** Badge content — string (auto-wrapped in Text) or nodes. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Badge (native) — a small label for statuses, counts, and tags.
 *
 * Mirrors the web Badge props API. String children are wrapped in styled Text.
 */
export function Badge({
  variant = 'neutral',
  size = 'md',
  pill = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  const containers: Record<BadgeVariant, string> = {
    neutral: 'bg-grey-22',
    primary: 'bg-yellow-tint',
    success: 'bg-success-tint',
    warning: 'bg-warning-tint',
    danger: 'bg-danger-tint',
    info: 'bg-info-tint',
  }

  const texts: Record<BadgeVariant, string> = {
    neutral: 'text-grey-F0',
    primary: 'text-yellow',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    info: 'text-info',
  }

  const sizes: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5',
    md: 'px-2.5 py-1',
  }

  const textSizes: Record<BadgeSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
  }

  return (
    <View
      className={cn(
        'self-start flex-row items-center',
        pill ? 'rounded-full' : 'rounded-md',
        containers[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text className={cn('font-medium', texts[variant], textSizes[size])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}
