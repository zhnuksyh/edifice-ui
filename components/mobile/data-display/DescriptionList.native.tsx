import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type DescriptionListLayout = 'row' | 'stacked'

export interface DescriptionItem {
  /** Stable key. */
  id: string
  /** The field label. String or nodes. */
  term: ReactNode
  /** The field value. String or nodes. */
  description: ReactNode
}

export interface DescriptionListProps extends ViewProps {
  /** Key/value pairs to render. */
  items: DescriptionItem[]
  /**
   * 'row' puts term and description side by side; 'stacked' puts the
   * description below the term. Defaults to 'row'.
   */
  layout?: DescriptionListLayout
  /** Draw a hairline divider between rows. Defaults to true. */
  divided?: boolean
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * DescriptionList (native) — key/value pairs for detail and summary views.
 *
 * Mirrors the web DescriptionList props API. 'row' lays term and value side by
 * side; 'stacked' stacks them. String term/description are wrapped in styled
 * <Text>.
 */
export function DescriptionList({
  items,
  layout = 'row',
  divided = true,
  className,
  ...rest
}: DescriptionListProps) {
  if (items.length === 0) return null

  return (
    <View className={className} {...rest}>
      {items.map((item, index) => {
        const isFirst = index === 0
        const isLast = index === items.length - 1
        return (
          <View
            key={item.id}
            className={cn(
              'py-3',
              isFirst && 'pt-0',
              isLast && 'pb-0',
              divided && !isLast && 'border-b border-grey-2A',
              layout === 'row' ? 'flex-row gap-4' : 'flex-col gap-1'
            )}
          >
            {typeof item.term === 'string' ? (
              <Text
                className={cn(
                  'text-sm font-medium text-text-secondary',
                  layout === 'row' && 'flex-1'
                )}
              >
                {item.term}
              </Text>
            ) : (
              <View className={cn(layout === 'row' && 'flex-1')}>{item.term}</View>
            )}

            {typeof item.description === 'string' ? (
              <Text
                className={cn(
                  'text-sm text-text-primary',
                  layout === 'row' && 'flex-[2]'
                )}
              >
                {item.description}
              </Text>
            ) : (
              <View className={cn(layout === 'row' && 'flex-[2]')}>
                {item.description}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}
