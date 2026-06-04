import { useEffect } from 'react'
import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info'

export interface ToastProps extends ViewProps {
  /** Tone. Defaults to 'info'. */
  variant?: ToastVariant
  /** Optional bold heading. String or nodes. */
  title?: ReactNode
  /** Message body. String or nodes. */
  children: ReactNode
  /** Called on dismiss (manual or auto). */
  onClose?: () => void
  /** Auto-dismiss delay in ms; 0 disables. Defaults to 4000. */
  duration?: number
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Toast (native) — transient notification message.
 *
 * Mirrors the web Toast props API. Auto-dismisses after `duration` ms (0 to
 * disable). The consumer controls mounting/visibility and placement (typically
 * an absolutely-positioned container). String `title`/`children` are wrapped in
 * styled <Text>.
 */
export function Toast({
  variant = 'info',
  title,
  children,
  onClose,
  duration = 4000,
  className,
  ...rest
}: ToastProps) {
  useEffect(() => {
    if (!duration || !onClose) return undefined
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const containers: Record<ToastVariant, string> = {
    success: 'border-success bg-success-tint',
    warning: 'border-warning bg-warning-tint',
    danger: 'border-danger bg-danger-tint',
    info: 'border-info bg-info-tint',
  }

  const accents: Record<ToastVariant, string> = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    info: 'text-info',
  }

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
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
      {onClose && (
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss notification"
          hitSlop={8}
        >
          <Text className="text-text-secondary">✕</Text>
        </Pressable>
      )}
    </View>
  )
}
