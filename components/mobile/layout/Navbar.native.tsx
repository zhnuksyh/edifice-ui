import { View, Text, Pressable, ScrollView, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface NavLink {
  label: string
  /** Press handler (RN has no href). */
  onPress?: () => void
  active?: boolean
}

export interface NavbarProps extends ViewProps {
  /** Logo or brand name (left). String or nodes. */
  brand?: ReactNode
  /** Primary navigation links, shown in a scrollable row beneath the bar. */
  links?: NavLink[]
  /** Right-aligned actions (e.g. buttons, avatar). */
  actions?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Navbar (native) — top navigation bar with brand, links, and an actions slot.
 *
 * Mirrors the web Navbar props API, except links use `onPress` (RN has no href)
 * and render in a horizontal scroll row below the bar (no desktop breakpoint /
 * hamburger). The web `sticky` prop is dropped — compose inside PageShell, which
 * keeps the navbar fixed above its scroll area. String brand is wrapped in <Text>.
 */
export function Navbar({
  brand,
  links = [],
  actions,
  className,
  ...rest
}: NavbarProps) {
  return (
    <View
      className={cn('w-full border-b border-grey-2A bg-surface', className)}
      {...rest}
    >
      <View className="h-16 flex-row items-center justify-between px-6">
        {brand != null ? (
          typeof brand === 'string' ? (
            <Text className="text-lg font-bold text-text-primary">{brand}</Text>
          ) : (
            brand
          )
        ) : (
          <View />
        )}
        {actions != null && (
          <View className="flex-row items-center gap-3">{actions}</View>
        )}
      </View>

      {links.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="border-t border-grey-2A"
          contentContainerClassName="items-center gap-6 px-6 py-3"
        >
          {links.map((link, i) => (
            <Pressable
              key={i}
              onPress={link.onPress}
              accessibilityRole="link"
              accessibilityState={{ selected: link.active }}
            >
              <Text
                className={cn(
                  'text-sm font-medium',
                  link.active ? 'text-yellow' : 'text-text-secondary'
                )}
              >
                {link.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  )
}
