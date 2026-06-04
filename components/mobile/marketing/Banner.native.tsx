import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type BannerTone = 'neutral' | 'accent' | 'info'

export interface BannerProps extends ViewProps {
  /** Tone. Defaults to 'accent'. */
  tone?: BannerTone
  /** Optional leading icon. */
  icon?: ReactNode
  /** Optional inline action (e.g. a link or Button). */
  action?: ReactNode
  /** Called when the dismiss button is pressed; omit to hide it. */
  onDismiss?: () => void
  /** Banner message. String or nodes. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Banner (native) — a full-width announcement bar, typically pinned at the top.
 *
 * Mirrors the web Banner props API. Optionally dismissible with a trailing
 * action. Keep the copy short. String children are wrapped in styled <Text>.
 */
export function Banner({
  tone = 'accent',
  icon,
  action,
  onDismiss,
  children,
  className,
  ...rest
}: BannerProps) {
  const containers: Record<BannerTone, string> = {
    neutral: 'bg-grey-1A border-grey-2A',
    accent: 'bg-yellow-tint border-yellow/20',
    info: 'bg-info-tint border-info/20',
  }

  const texts: Record<BannerTone, string> = {
    neutral: 'text-grey-F0',
    accent: 'text-yellow',
    info: 'text-info',
  }

  return (
    <View
      accessibilityRole="none"
      accessibilityLabel="Announcement"
      className={cn(
        'flex-row items-center justify-center gap-3 border-b px-4 py-2.5',
        containers[tone],
        className
      )}
      {...rest}
    >
      {icon != null && <View className="shrink-0">{icon}</View>}
      {typeof children === 'string' ? (
        <Text className={cn('text-center text-sm font-medium', texts[tone])}>
          {children}
        </Text>
      ) : (
        children
      )}
      {action != null && <View className="shrink-0">{action}</View>}
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss announcement"
          hitSlop={8}
          className="ml-1 shrink-0 opacity-70"
        >
          <Text className={cn('text-sm', texts[tone])}>✕</Text>
        </Pressable>
      )}
    </View>
  )
}
