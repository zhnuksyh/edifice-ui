import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface ContactSectionProps extends ViewProps {
  /** Heading. Defaults to 'Get in touch'. */
  title?: ReactNode
  /** Supporting paragraph. */
  subtitle?: ReactNode
  /**
   * The contact form. Compose it from the mobile form components (Input,
   * Textarea, a submit button) and pass it here. Taken as a slot rather than
   * built in, since mobile components don't import one another.
   */
  form?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * ContactSection (native) — marketing contact block with intro copy and a form.
 *
 * Mirrors the web ContactSection's intent. The web version builds the form from
 * Input/Textarea/Button internally; on mobile the form is a `form` slot (the
 * consumer composes it from the mobile form components), keeping this file free
 * of cross-native imports. String title/subtitle are wrapped in styled <Text>.
 */
export function ContactSection({
  title = 'Get in touch',
  subtitle,
  form,
  className,
  ...rest
}: ContactSectionProps) {
  return (
    <View className={cn('gap-8 bg-surface px-6 py-16', className)} {...rest}>
      <View className="gap-4">
        {typeof title === 'string' ? (
          <Text className="text-3xl font-bold text-text-primary">{title}</Text>
        ) : (
          title
        )}
        {subtitle != null &&
          (typeof subtitle === 'string' ? (
            <Text className="text-lg leading-relaxed text-text-secondary">
              {subtitle}
            </Text>
          ) : (
            subtitle
          ))}
      </View>
      {form != null && <View className="gap-4">{form}</View>}
    </View>
  )
}
