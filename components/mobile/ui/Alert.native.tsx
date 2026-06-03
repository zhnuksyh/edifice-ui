import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps extends ViewProps {
  /** Tone. Defaults to 'info'. */
  variant?: AlertVariant
  /** Optional bold heading. String or nodes. */
  title?: ReactNode
  /** Message body. String or nodes. */
  children: ReactNode
  /** Show a dismiss button; called when pressed. */
  onDismiss?: () => void
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Alert (native) — a persistent, in-page status message.
 *
 * Mirrors the web Alert props API. Unlike a transient toast, an Alert stays in
 * the layout until removed. String `title`/`children` are wrapped in styled
 * <Text> automatically.
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  className,
  ...rest
}: AlertProps) {
  const containers: Record<AlertVariant, string> = {
    info: 'border-info bg-info-tint',
    success: 'border-success bg-success-tint',
    warning: 'border-warning bg-warning-tint',
    danger: 'border-danger bg-danger-tint',
  }

  const accents: Record<AlertVariant, string> = {
    info: 'text-info',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  }

  return (
    <View
      accessibilityRole="alert"
      className={cn(
        'flex-row items-start gap-3 rounded-lg border-l-4 bg-surface p-4',
        containers[variant],
        className
      )}
      {...rest}
    >
      <View className="flex-1">
        {title != null &&
          (typeof title === 'string' ? (
            <Text className={cn('font-semibold', accents[variant])}>{title}</Text>
          ) : (
            title
          ))}
        {typeof children === 'string' ? (
          <Text className="text-sm text-text-secondary">{children}</Text>
        ) : (
          children
        )}
      </View>
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          hitSlop={8}
        >
          <Text className="text-text-secondary">✕</Text>
        </Pressable>
      )}
    </View>
  )
}
