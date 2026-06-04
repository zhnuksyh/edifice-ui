import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface LogoCloudLogo {
  /** Stable key. */
  id: string
  /** The logo — an Image, inline SVG element, or wordmark text. */
  content: ReactNode
  /** Optional accessible label / company name. */
  label?: string
}

export interface LogoCloudProps extends ViewProps {
  /** Optional eyebrow/heading above the logos (e.g. 'Trusted by teams at'). */
  title?: ReactNode
  /** The logos to display. */
  logos: LogoCloudLogo[]
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * LogoCloud (native) — a "trusted by" strip of partner/customer logos.
 *
 * Mirrors the web LogoCloud props API. Logos render muted (accent restraint;
 * the web hover-brighten has no touch equivalent). Pass Images, SVG elements,
 * or wordmark text as each logo's `content`.
 */
export function LogoCloud({ title, logos, className, ...rest }: LogoCloudProps) {
  if (logos.length === 0) return null

  return (
    <View className={cn('px-6 py-12', className)} {...rest}>
      {title != null &&
        (typeof title === 'string' ? (
          <Text className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-grey-AA">
            {title}
          </Text>
        ) : (
          title
        ))}
      <View className="flex-row flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((logo) => (
          <View
            key={logo.id}
            accessibilityLabel={logo.label}
            className="h-8 items-center justify-center opacity-70"
          >
            {typeof logo.content === 'string' ? (
              <Text className="text-grey-66">{logo.content}</Text>
            ) : (
              logo.content
            )}
          </View>
        ))}
      </View>
    </View>
  )
}
