import { View, ActivityIndicator, type ViewProps } from 'react-native'
import { colors } from '../../../tokens'
import { cn } from '../../../utils/cn'

export type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerTone = 'primary' | 'neutral' | 'inverse' | 'purple'

export interface SpinnerProps extends ViewProps {
  /** Size preset. Defaults to 'md'. */
  size?: SpinnerSize
  /** Color tone. Defaults to 'primary'. */
  tone?: SpinnerTone
  /** Accessible label for screen readers. Defaults to 'Loading'. */
  label?: string
  /** Extra NativeWind classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * Spinner (native) — an animated loading indicator for React Native.
 *
 * Mirrors the web Spinner props API, wrapping the platform `ActivityIndicator`.
 * Color comes from design tokens (RN's indicator takes a color value, not a
 * className).
 */
export function Spinner({
  size = 'md',
  tone = 'primary',
  label = 'Loading',
  className,
  ...rest
}: SpinnerProps) {
  // ActivityIndicator's 'small' ≈ 20px, 'large' ≈ 36px; pass a number for 'md'.
  const sizes: Record<SpinnerSize, number | 'small' | 'large'> = {
    sm: 'small',
    md: 28,
    lg: 'large',
  }

  const tones: Record<SpinnerTone, string> = {
    primary: colors.yellow.DEFAULT,
    neutral: colors.grey.AA,
    inverse: colors.grey.F0,
    purple: colors.purple.DEFAULT,
  }

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      className={cn('items-center justify-center', className)}
      {...rest}
    >
      <ActivityIndicator size={sizes[size]} color={tones[tone]} />
    </View>
  )
}
