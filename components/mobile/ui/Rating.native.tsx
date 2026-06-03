import { View, Text, Pressable, type ViewProps } from 'react-native'
import { cn } from '../../../utils/cn'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps extends ViewProps {
  /** Current rating (number of filled stars). */
  value: number
  /** Called with the new value when a star is pressed. Omit for read-only. */
  onChange?: (value: number) => void
  /** Total number of stars. Defaults to 5. */
  max?: number
  /** Star size. Defaults to 'md'. */
  size?: RatingSize
  /** Disable interaction (display only). Inferred when `onChange` is omitted. */
  readOnly?: boolean
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Rating (native) — a star rating control, interactive or read-only.
 *
 * Mirrors the web Rating props API. Provide `onChange` for interactivity
 * (press to set); omit it (or set `readOnly`) for a static display. Touch has
 * no hover-preview, so the native control sets the value on press. The consumer
 * owns `value`.
 */
export function Rating({
  value,
  onChange,
  max = 5,
  size = 'md',
  readOnly,
  className,
  ...rest
}: RatingProps) {
  const interactive = !readOnly && Boolean(onChange)

  const sizes: Record<RatingSize, string> = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-3xl',
  }

  return (
    <View
      accessibilityRole={interactive ? 'adjustable' : 'image'}
      accessibilityLabel={`Rated ${value} out of ${max}`}
      className={cn('flex-row items-center gap-0.5', className)}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= value
        const glyph = (
          <Text className={cn(sizes[size], filled ? 'text-yellow' : 'text-grey-2A')}>
            {filled ? '★' : '☆'}
          </Text>
        )

        if (!interactive) {
          return <View key={starValue}>{glyph}</View>
        }

        return (
          <Pressable
            key={starValue}
            onPress={() => onChange?.(starValue)}
            accessibilityRole="button"
            accessibilityLabel={`${starValue} star${starValue === 1 ? '' : 's'}`}
            accessibilityState={{ selected: starValue === value }}
            hitSlop={4}
          >
            {glyph}
          </Pressable>
        )
      })}
    </View>
  )
}
