import { useState } from 'react'
import { View, Text, TextInput, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface NewsletterSignupProps extends ViewProps {
  /** Heading above the form. */
  title?: ReactNode
  /** Supporting line below the heading. */
  subtitle?: ReactNode
  /** Submit button label. Defaults to 'Subscribe'. */
  buttonLabel?: string
  /** Email input placeholder. Defaults to 'you@example.com'. */
  placeholder?: string
  /** Fine print below the form (e.g. privacy note). */
  note?: ReactNode
  /** Called with the entered email on submit. */
  onSubscribe?: (email: string) => void
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * NewsletterSignup (native) — an email-capture block with heading and form.
 *
 * Mirrors the web NewsletterSignup props API. Manages the email field
 * internally and calls `onSubscribe(email)` on submit. The input + submit button
 * are inlined (mobile components don't import the Button). The web's inline
 * row stacks vertically. String title/subtitle/note are wrapped in styled <Text>.
 */
export function NewsletterSignup({
  title,
  subtitle,
  buttonLabel = 'Subscribe',
  placeholder = 'you@example.com',
  note,
  onSubscribe,
  className,
  ...rest
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')

  const submit = () => {
    if (email.trim()) onSubscribe?.(email.trim())
  }

  return (
    <View className={cn('items-center gap-3 px-6 py-12', className)} {...rest}>
      {title != null &&
        (typeof title === 'string' ? (
          <Text className="text-center text-2xl font-bold text-grey-F0">{title}</Text>
        ) : (
          title
        ))}
      {subtitle != null &&
        (typeof subtitle === 'string' ? (
          <Text className="max-w-md text-center text-grey-AA">{subtitle}</Text>
        ) : (
          subtitle
        ))}

      <View className="mt-3 w-full max-w-md gap-3">
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          accessibilityLabel="Email address"
          onSubmitEditing={submit}
          className="h-11 rounded-lg border border-grey-2A bg-grey-1A px-4 text-sm text-grey-F0"
        />
        <Pressable
          onPress={submit}
          accessibilityRole="button"
          accessibilityLabel={buttonLabel}
          className="h-11 items-center justify-center rounded-lg bg-yellow"
        >
          <Text className="text-sm font-medium text-grey-0A">{buttonLabel}</Text>
        </Pressable>
      </View>

      {note != null &&
        (typeof note === 'string' ? (
          <Text className="mt-3 text-center text-xs text-grey-66">{note}</Text>
        ) : (
          note
        ))}
    </View>
  )
}
