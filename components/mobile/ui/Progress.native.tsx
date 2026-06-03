import { useEffect, useRef } from 'react'
import { View, Animated, Easing, type ViewProps } from 'react-native'
import { cn } from '../../../utils/cn'

export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressTone = 'primary' | 'success' | 'danger'

export interface ProgressProps extends ViewProps {
  /** Current value 0–max. Omit for an indeterminate bar. */
  value?: number
  /** Maximum value. Defaults to 100. */
  max?: number
  /** Bar thickness. Defaults to 'md'. */
  size?: ProgressSize
  /** Fill color tone. Defaults to 'primary'. */
  tone?: ProgressTone
  /** Accessible label. */
  label?: string
  /** Extra NativeWind classes merged onto the track via cn(). */
  className?: string
}

/**
 * Progress (native) — a linear progress bar.
 *
 * Mirrors the web Progress props API. Determinate when `value` is provided
 * (0–`max`); indeterminate (an Animated looping sweep) when `value` is omitted.
 */
export function Progress({
  value,
  max = 100,
  size = 'md',
  tone = 'primary',
  label = 'Loading',
  className,
  ...rest
}: ProgressProps) {
  const indeterminate = value === undefined
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  // Drives the indeterminate sweep across the track (0 → 1 of track width).
  const sweep = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!indeterminate) return
    const loop = Animated.loop(
      Animated.timing(sweep, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    )
    loop.start()
    return () => loop.stop()
  }, [indeterminate, sweep])

  const sizes: Record<ProgressSize, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const tones: Record<ProgressTone, string> = {
    primary: 'bg-yellow',
    success: 'bg-success',
    danger: 'bg-danger',
  }

  // The fill occupies a third of the track and translates across it.
  const translate = sweep.interpolate({
    inputRange: [0, 1],
    outputRange: ['-33%', '100%'],
  })

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={
        indeterminate ? undefined : { min: 0, max, now: value }
      }
      className={cn(
        'w-full overflow-hidden rounded-full bg-grey-2A',
        sizes[size],
        className
      )}
      {...rest}
    >
      {indeterminate ? (
        <Animated.View
          className={cn('h-full w-1/3 rounded-full', tones[tone])}
          style={{ transform: [{ translateX: translate }] }}
        />
      ) : (
        <View
          className={cn('h-full rounded-full', tones[tone])}
          style={{ width: `${pct}%` }}
        />
      )}
    </View>
  )
}
