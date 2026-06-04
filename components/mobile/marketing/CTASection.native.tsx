import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface CTASectionProps extends ViewProps {
  /** CTA headline. String or nodes. */
  title: ReactNode
  /** Supporting line. String or nodes. */
  subtitle?: ReactNode
  /** CTA buttons. */
  actions?: ReactNode
  /** Use the dark, high-contrast variant. Defaults to true. */
  inverted?: boolean
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * CTASection (native) — a bold call-to-action band.
 *
 * Mirrors the web CTASection props API. String title/subtitle are wrapped in
 * styled <Text>.
 */
export function CTASection({
  title,
  subtitle,
  actions,
  inverted = true,
  className,
  ...rest
}: CTASectionProps) {
  return (
    <View
      className={cn(
        'items-center gap-4 px-6 py-16',
        inverted ? 'bg-grey-0A' : 'bg-grey-1A',
        className
      )}
      {...rest}
    >
      {typeof title === 'string' ? (
        <Text className="text-center text-3xl font-bold text-grey-F0">{title}</Text>
      ) : (
        title
      )}
      {subtitle != null &&
        (typeof subtitle === 'string' ? (
          <Text className="text-center text-lg text-grey-AA">{subtitle}</Text>
        ) : (
          subtitle
        ))}
      {actions != null && (
        <View className="mt-2 flex-row flex-wrap justify-center gap-4">{actions}</View>
      )}
    </View>
  )
}
