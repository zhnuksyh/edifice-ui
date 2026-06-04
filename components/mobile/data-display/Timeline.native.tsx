import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type TimelineTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

export interface TimelineItem {
  /** Stable key. */
  id: string
  /** Event heading. String or nodes. */
  title: ReactNode
  /** Optional timestamp / meta line. String or nodes. */
  time?: ReactNode
  /** Optional body content. String or nodes. */
  description?: ReactNode
  /** Dot tone. Defaults to 'neutral'. */
  tone?: TimelineTone
  /** Optional icon rendered inside the dot instead of a plain marker. */
  icon?: ReactNode
}

export interface TimelineProps extends ViewProps {
  /** Ordered list of events, oldest or newest first (caller decides). */
  items: TimelineItem[]
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Timeline (native) — a vertical sequence of events connected by a rail.
 *
 * Mirrors the web Timeline props API. Each item shows a toned dot, a title, an
 * optional timestamp, and optional body. String title/time/description are
 * wrapped in styled <Text>.
 */
export function Timeline({ items, className, ...rest }: TimelineProps) {
  const tones: Record<TimelineTone, string> = {
    neutral: 'bg-grey-44 border-grey-44',
    primary: 'bg-yellow border-yellow',
    success: 'bg-success border-success',
    warning: 'bg-warning border-warning',
    danger: 'bg-danger border-danger',
  }

  if (items.length === 0) return null

  return (
    <View className={className} {...rest}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const tone = item.tone ?? 'neutral'
        return (
          <View key={item.id} className="flex-row gap-4">
            {/* Gutter: dot + connecting rail */}
            <View className="items-center">
              <View
                className={cn(
                  'mt-1 h-4 w-4 items-center justify-center rounded-full border-2',
                  item.icon ? 'border-grey-44 bg-grey-22' : tones[tone]
                )}
              >
                {item.icon}
              </View>
              {!isLast && <View className="w-px flex-1 bg-grey-2A" />}
            </View>

            <View className={cn('min-w-0 flex-1', isLast ? 'pb-0' : 'pb-6')}>
              {typeof item.title === 'string' ? (
                <Text className="font-medium text-text-primary">{item.title}</Text>
              ) : (
                item.title
              )}
              {item.time != null &&
                (typeof item.time === 'string' ? (
                  <Text className="text-xs text-text-muted">{item.time}</Text>
                ) : (
                  item.time
                ))}
              {item.description != null &&
                (typeof item.description === 'string' ? (
                  <Text className="mt-1 text-sm text-text-secondary">
                    {item.description}
                  </Text>
                ) : (
                  item.description
                ))}
            </View>
          </View>
        )
      })}
    </View>
  )
}
