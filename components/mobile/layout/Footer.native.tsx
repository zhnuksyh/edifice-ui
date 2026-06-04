import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface FooterColumn {
  title: string
  links: Array<{ label: string; onPress?: () => void }>
}

export interface FooterProps extends ViewProps {
  /** Brand mark / blurb (top). String or nodes. */
  brand?: ReactNode
  /** Grouped link columns. */
  columns?: FooterColumn[]
  /** Bottom-bar content (defaults to a copyright line if omitted). */
  bottom?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Footer (native) — site footer with grouped link columns and a bottom bar.
 *
 * Mirrors the web Footer props API, except links use `onPress` (RN has no href)
 * and the column grid stacks vertically. String brand/bottom are wrapped in
 * styled <Text>.
 */
export function Footer({
  brand,
  columns = [],
  bottom,
  className,
  ...rest
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <View
      className={cn('border-t border-grey-2A bg-surface px-6 py-12', className)}
      {...rest}
    >
      <View className="gap-8">
        {brand != null &&
          (typeof brand === 'string' ? (
            <Text className="text-text-secondary">{brand}</Text>
          ) : (
            brand
          ))}
        {columns.map((col) => (
          <View key={col.title}>
            <Text className="mb-3 text-sm font-semibold text-text-primary">
              {col.title}
            </Text>
            <View className="gap-2">
              {col.links.map((link, i) => (
                <Pressable key={i} onPress={link.onPress} accessibilityRole="link">
                  <Text className="text-sm text-text-secondary">{link.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View className="mt-10 border-t border-grey-2A pt-6">
        {bottom != null ? (
          typeof bottom === 'string' ? (
            <Text className="text-sm text-text-secondary">{bottom}</Text>
          ) : (
            bottom
          )
        ) : (
          <Text className="text-sm text-text-secondary">
            © {year} All rights reserved.
          </Text>
        )}
      </View>
    </View>
  )
}
