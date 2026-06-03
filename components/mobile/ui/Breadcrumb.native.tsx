import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface BreadcrumbItem {
  label: ReactNode
  /** Press handler; omit for the current (last) item. */
  onPress?: () => void
}

export interface BreadcrumbProps extends ViewProps {
  /** Trail items, root first. The last item is treated as the current page. */
  items: BreadcrumbItem[]
  /** Separator between items. Defaults to a chevron glyph. */
  separator?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Breadcrumb (native) — a navigation trail to the current screen.
 *
 * Mirrors the web Breadcrumb props API, except links use `onPress` (RN has no
 * href). The final item renders as the current page (not pressable) with
 * `aria-current` semantics via accessibilityState.
 */
export function Breadcrumb({
  items,
  separator,
  className,
  ...rest
}: BreadcrumbProps) {
  if (items.length === 0) return null

  const sep =
    separator ?? <Text className="text-sm text-text-muted">›</Text>

  return (
    <View
      accessibilityRole="none"
      className={cn('flex-row flex-wrap items-center gap-2', className)}
      {...rest}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        const labelEl =
          typeof item.label === 'string' ? (
            <Text
              className={cn(
                'text-sm',
                isLast ? 'font-medium text-text-primary' : 'text-text-secondary'
              )}
            >
              {item.label}
            </Text>
          ) : (
            item.label
          )

        return (
          <View key={i} className="flex-row items-center gap-2">
            {isLast || !item.onPress ? (
              <View accessibilityState={isLast ? { selected: true } : undefined}>
                {labelEl}
              </View>
            ) : (
              <Pressable onPress={item.onPress} accessibilityRole="link" hitSlop={4}>
                {labelEl}
              </Pressable>
            )}
            {!isLast && (
              <View accessibilityElementsHidden importantForAccessibility="no">
                {sep}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}
