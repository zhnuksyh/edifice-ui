import { useState } from 'react'
import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface FAQItem {
  question: string
  answer: ReactNode
}

export interface FAQSectionProps extends ViewProps {
  /** Section heading. Defaults to 'Frequently asked questions'. */
  title?: ReactNode
  /** Optional supporting line under the heading. */
  subtitle?: ReactNode
  /** The question/answer pairs. */
  items: FAQItem[]
  /** Allow multiple answers open at once. Defaults to false. */
  allowMultiple?: boolean
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * FAQSection (native) — a titled list of expandable Q&A.
 *
 * Mirrors the web FAQSection props API. The disclosure behavior is inlined
 * (rather than composing the Accordion component) to keep this file
 * self-contained, per the mobile no-cross-native-import convention. String
 * answers are wrapped in styled <Text>.
 */
export function FAQSection({
  title = 'Frequently asked questions',
  subtitle,
  items,
  allowMultiple = false,
  className,
  ...rest
}: FAQSectionProps) {
  const [openIds, setOpenIds] = useState<string[]>([])

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id)
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id]
      }
      return isOpen ? [] : [id]
    })
  }

  return (
    <View className={cn('bg-background px-6 py-16', className)} {...rest}>
      <View className="mb-8 items-center">
        {typeof title === 'string' ? (
          <Text className="font-display text-3xl font-bold text-text-primary">
            {title}
          </Text>
        ) : (
          title
        )}
        {subtitle != null &&
          (typeof subtitle === 'string' ? (
            <Text className="mt-3 text-center text-text-secondary">{subtitle}</Text>
          ) : (
            subtitle
          ))}
      </View>

      <View className="overflow-hidden rounded-xl border border-grey-2A">
        {items.map((item, index) => {
          const id = String(index)
          const isOpen = openIds.includes(id)
          return (
            <View key={id} className={cn(index > 0 && 'border-t border-grey-2A')}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ expanded: isOpen }}
                onPress={() => toggle(id)}
                className="flex-row items-center justify-between px-5 py-4 active:bg-grey-22"
              >
                <Text className="flex-1 font-medium text-text-primary">
                  {item.question}
                </Text>
                <Text className="ml-4 text-text-secondary">{isOpen ? '▴' : '▾'}</Text>
              </Pressable>
              {isOpen && (
                <View className="px-5 pb-5">
                  {typeof item.answer === 'string' ? (
                    <Text className="text-sm text-text-secondary">{item.answer}</Text>
                  ) : (
                    item.answer
                  )}
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}
