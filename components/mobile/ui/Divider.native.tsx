import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends ViewProps {
  /** Line direction. Defaults to 'horizontal'. */
  orientation?: DividerOrientation
  /** Optional centered label (horizontal only). String or nodes. */
  label?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Divider (native) — a separator line, optionally with a centered label.
 *
 * Mirrors the web Divider props API. Horizontal by default; `vertical` for
 * inline separation (give the parent a height). A `label` splits a horizontal
 * divider with centered text; string labels are wrapped in styled <Text>.
 */
export function Divider({
  orientation = 'horizontal',
  label,
  className,
  ...rest
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <View
        accessibilityRole="none"
        className={cn('mx-2 w-px self-stretch bg-grey-2A', className)}
        {...rest}
      />
    )
  }

  if (label != null) {
    return (
      <View
        accessibilityRole="none"
        className={cn('flex-row items-center gap-3', className)}
        {...rest}
      >
        <View className="h-px flex-1 bg-grey-2A" />
        {typeof label === 'string' ? (
          <Text className="text-xs font-medium uppercase tracking-wide text-text-muted">
            {label}
          </Text>
        ) : (
          label
        )}
        <View className="h-px flex-1 bg-grey-2A" />
      </View>
    )
  }

  return (
    <View
      accessibilityRole="none"
      className={cn('h-px w-full bg-grey-2A', className)}
      {...rest}
    />
  )
}
