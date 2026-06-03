import { useEffect, useRef } from 'react'
import { View, Animated, Easing, type ViewProps, type DimensionValue } from 'react-native'
import { cn } from '../../../utils/cn'

export type SkeletonVariant = 'text' | 'circle' | 'rect'

export interface SkeletonProps extends ViewProps {
  /** Shape. Defaults to 'text'. */
  variant?: SkeletonVariant
  /** Width (number → px, or any RN dimension). */
  width?: DimensionValue
  /** Height (number → px, or any RN dimension). */
  height?: DimensionValue
  /** For `text`: render this many stacked lines. Defaults to 1. */
  lines?: number
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Skeleton (native) — an animated placeholder for content still loading.
 *
 * Mirrors the web Skeleton props API. `text` renders one or more lines;
 * `circle` an avatar-style dot; `rect` a block. The pulse is driven by the
 * Animated API (RN has no CSS keyframes).
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const pulse = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.5,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [pulse])

  const base = 'bg-grey-2A'

  if (variant === 'text' && lines > 1) {
    return (
      <View className="gap-2" {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <Animated.View
            key={i}
            className={cn(base, 'h-4 rounded', className)}
            // Last line is shorter for a natural paragraph look.
            style={{ opacity: pulse, width: i === lines - 1 ? '70%' : width ?? '100%' }}
          />
        ))}
      </View>
    )
  }

  const shapes: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  }

  return (
    <Animated.View
      className={cn(base, shapes[variant], className)}
      style={[
        {
          opacity: pulse,
          width: width ?? (variant === 'text' ? '100%' : undefined),
          height,
        },
        style,
      ]}
      {...rest}
    />
  )
}
