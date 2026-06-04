import { useState } from 'react'
import { View, Text, Pressable, ScrollView, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface TabItem {
  /** Unique value identifying the tab. */
  value: string
  /** Tab button label. String or nodes. */
  label: ReactNode
  /** Panel content shown when the tab is active. */
  content: ReactNode
  /** Disable this tab. */
  disabled?: boolean
}

export interface TabsProps extends ViewProps {
  /** The tabs to render. */
  items: TabItem[]
  /** Initially active tab value (uncontrolled). Defaults to the first item. */
  defaultValue?: string
  /** Controlled active tab value. */
  value?: string
  /** Called with the next value when a tab is selected. */
  onValueChange?: (value: string) => void
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Tabs (native) — switch between panels of content.
 *
 * Mirrors the web Tabs props API. Uncontrolled by default; pass `value` +
 * `onValueChange` to control it. The tab strip scrolls horizontally when it
 * overflows. String labels are wrapped in styled <Text>.
 */
export function Tabs({
  items = [],
  defaultValue,
  value,
  onValueChange,
  className,
  ...rest
}: TabsProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.value ?? '')
  const active = isControlled ? value : internal

  if (items.length === 0) return null

  const select = (next: string) => {
    if (!isControlled) setInternal(next)
    onValueChange?.(next)
  }

  const activePanel = items.find((item) => item.value === active)

  return (
    <View className={cn('gap-4', className)} {...rest}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="border-b border-grey-2A"
      >
        <View accessibilityRole="tablist" className="flex-row gap-1">
          {items.map((item) => {
            const selected = item.value === active
            return (
              <Pressable
                key={item.value}
                accessibilityRole="tab"
                accessibilityState={{ selected, disabled: item.disabled }}
                disabled={item.disabled}
                onPress={() => select(item.value)}
                className={cn(
                  'border-b-2 px-4 py-2',
                  selected ? 'border-yellow' : 'border-transparent',
                  item.disabled && 'opacity-50'
                )}
              >
                {typeof item.label === 'string' ? (
                  <Text
                    className={cn(
                      'text-sm font-medium',
                      selected ? 'text-yellow' : 'text-text-secondary'
                    )}
                  >
                    {item.label}
                  </Text>
                ) : (
                  item.label
                )}
              </Pressable>
            )
          })}
        </View>
      </ScrollView>

      {activePanel && (
        <View accessibilityRole="none">{activePanel.content}</View>
      )}
    </View>
  )
}
