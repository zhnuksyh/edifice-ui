import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface HeroSectionProps extends ViewProps {
  /** Small label above the title. String or nodes. */
  eyebrow?: ReactNode
  /** Main headline. String or nodes. */
  title: ReactNode
  /** Supporting paragraph. String or nodes. */
  subtitle?: ReactNode
  /** CTA buttons. */
  actions?: ReactNode
  /** Optional media (image/illustration) rendered below the copy. */
  media?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * HeroSection (native) — top-of-screen marketing hero with headline, subcopy,
 * and CTAs.
 *
 * Mirrors the web HeroSection props API. The web's two-column media layout
 * stacks vertically on mobile (media below the copy). String eyebrow/title/
 * subtitle are wrapped in styled <Text>.
 */
export function HeroSection({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
  className,
  ...rest
}: HeroSectionProps) {
  return (
    <View className={cn('items-center gap-6 bg-background px-6 py-16', className)} {...rest}>
      <View className="items-center gap-4">
        {eyebrow != null &&
          (typeof eyebrow === 'string' ? (
            <Text className="text-sm font-semibold uppercase tracking-wide text-yellow">
              {eyebrow}
            </Text>
          ) : (
            eyebrow
          ))}
        {typeof title === 'string' ? (
          <Text className="text-center text-4xl font-bold leading-tight text-text-primary">
            {title}
          </Text>
        ) : (
          title
        )}
        {subtitle != null &&
          (typeof subtitle === 'string' ? (
            <Text className="text-center text-lg leading-relaxed text-text-secondary">
              {subtitle}
            </Text>
          ) : (
            subtitle
          ))}
      </View>
      {actions != null && (
        <View className="flex-row flex-wrap justify-center gap-4">{actions}</View>
      )}
      {media != null && <View className="w-full">{media}</View>}
    </View>
  )
}
