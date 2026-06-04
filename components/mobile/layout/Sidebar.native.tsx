import { View, Text, Pressable, ScrollView, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface SidebarItem {
  /** Stable key / id. */
  id: string
  /** Link label. String or nodes. */
  label: ReactNode
  /** Optional leading icon. */
  icon?: ReactNode
  /** Marks the current item. */
  active?: boolean
  /** Press handler. */
  onPress?: () => void
}

export interface SidebarGroup {
  /** Stable key. */
  id: string
  /** Optional group heading. String or nodes. */
  label?: ReactNode
  /** Items in this group. */
  items: SidebarItem[]
}

export interface SidebarProps extends ViewProps {
  /** Top slot — brand/logo. */
  header?: ReactNode
  /** Grouped navigation. */
  groups: SidebarGroup[]
  /** Bottom slot — user menu, settings, etc. */
  footer?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Sidebar (native) — a vertical navigation rail for app shells / drawers.
 *
 * Mirrors the web Sidebar props API, except items use `onPress` (RN has no
 * href). Renders grouped, active-aware items with optional icons, plus header
 * and footer slots. Pairs naturally inside a Drawer on mobile. String labels
 * are wrapped in styled <Text>.
 */
export function Sidebar({
  header,
  groups,
  footer,
  className,
  ...rest
}: SidebarProps) {
  return (
    <View
      className={cn(
        'h-full w-60 border-r border-grey-2A bg-grey-1A',
        className
      )}
      {...rest}
    >
      {header != null && (
        <View className="border-b border-grey-2A px-5 py-4">{header}</View>
      )}

      <ScrollView className="flex-1 p-3">
        {groups.map((group, index) => (
          <View key={group.id} className={cn(index > 0 && 'mt-6')}>
            {group.label != null &&
              (typeof group.label === 'string' ? (
                <Text className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-text-muted">
                  {group.label}
                </Text>
              ) : (
                <View className="mb-2 px-3">{group.label}</View>
              ))}
            <View className="gap-1">
              {group.items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={item.onPress}
                  accessibilityRole="button"
                  accessibilityState={{ selected: item.active }}
                  className={cn(
                    'flex-row items-center gap-2.5 rounded-lg px-3 py-2',
                    item.active ? 'bg-grey-22' : 'active:bg-grey-22'
                  )}
                >
                  {item.icon != null && (
                    <View className="shrink-0">{item.icon}</View>
                  )}
                  {typeof item.label === 'string' ? (
                    <Text
                      className={cn(
                        'flex-1 text-sm font-medium',
                        item.active ? 'text-yellow' : 'text-text-secondary'
                      )}
                      numberOfLines={1}
                    >
                      {item.label}
                    </Text>
                  ) : (
                    item.label
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {footer != null && (
        <View className="border-t border-grey-2A px-5 py-4">{footer}</View>
      )}
    </View>
  )
}
