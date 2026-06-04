import { useState } from 'react'
import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface AccordionItem {
  id: string
  /** Header label. String or nodes. */
  title: ReactNode
  /** Panel content shown when open. */
  content: ReactNode
}

export interface AccordionProps extends ViewProps {
  /** The panels to render. */
  items: AccordionItem[]
  /** Allow several panels open at once. Defaults to false. */
  allowMultiple?: boolean
  /** Initially open id(s). */
  defaultOpen?: string | string[]
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Accordion (native) — vertically stacked, expandable disclosure panels.
 *
 * Mirrors the web Accordion props API. Single-open by default, or multi-open.
 * The indicator swaps glyph (▾ open / ▴ closed) since RN has no CSS rotate
 * transition. String titles are wrapped in styled <Text>.
 */
export function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen,
  className,
  ...rest
}: AccordionProps) {
  const initial = Array.isArray(defaultOpen)
    ? defaultOpen
    : defaultOpen
      ? [defaultOpen]
      : []
  const [openIds, setOpenIds] = useState<string[]>(initial)

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id)
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id]
      }
      return isOpen ? [] : [id]
    })
  }

  if (items.length === 0) return null

  return (
    <View
      className={cn('overflow-hidden rounded-xl border border-grey-2A', className)}
      {...rest}
    >
      {items.map((item, index) => {
        const isOpen = openIds.includes(item.id)
        const isFirst = index === 0
        return (
          <View key={item.id} className={cn(!isFirst && 'border-t border-grey-2A')}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(item.id)}
              className="flex-row items-center justify-between px-5 py-4 active:bg-grey-22"
            >
              {typeof item.title === 'string' ? (
                <Text className="flex-1 font-medium text-text-primary">{item.title}</Text>
              ) : (
                <View className="flex-1">{item.title}</View>
              )}
              <Text className="ml-4 text-text-secondary">{isOpen ? '▴' : '▾'}</Text>
            </Pressable>
            {isOpen && <View className="px-5 pb-5">{item.content}</View>}
          </View>
        )
      })}
    </View>
  )
}
