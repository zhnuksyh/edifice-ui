import { useState } from 'react'
import { Modal as RNModal, View, Text, Pressable } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type MenuAlign = 'start' | 'end'

/** A selectable action. */
export interface MenuAction {
  kind?: 'action'
  /** Item label. String or nodes. */
  label: ReactNode
  /** Optional leading icon. */
  icon?: ReactNode
  /** Called when the item is selected. */
  onSelect?: () => void
  /** Style as a destructive action. */
  danger?: boolean
  /** Disable the item. */
  disabled?: boolean
}

/** A non-interactive divider or section label. */
export interface MenuDivider {
  kind: 'separator' | 'label'
  /** Text for a `label` item. String or nodes. */
  label?: ReactNode
}

export type MenuItem = MenuAction | MenuDivider

export interface MenuProps {
  /** The element that opens the menu. */
  trigger: ReactNode
  /** Menu items (actions, separators, labels). */
  items: MenuItem[]
  /** Which side of the trigger to align to. Defaults to 'start'. */
  align?: MenuAlign
  /** Extra NativeWind classes merged onto the panel via cn(). */
  className?: string
}

const isAction = (item: MenuItem): item is MenuAction =>
  item.kind === undefined || item.kind === 'action'

/**
 * Menu (native) — a dropdown of actions anchored to a trigger.
 *
 * Mirrors the web Menu props API (actions, separators, section labels, danger
 * and disabled items), minus keyboard navigation (no keyboard on touch). Opens
 * on trigger press; closes on select, outside press (transparent backdrop), and
 * Android back. String labels are wrapped in styled <Text>.
 */
export function Menu({ trigger, items, align = 'start', className }: MenuProps) {
  const [open, setOpen] = useState(false)

  const select = (item: MenuAction) => {
    if (item.disabled) return
    item.onSelect?.()
    setOpen(false)
  }

  return (
    <View className="relative self-start">
      <Pressable
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
      >
        {trigger}
      </Pressable>

      <RNModal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Full-screen backdrop closes the menu on outside press. */}
        <Pressable
          onPress={() => setOpen(false)}
          accessibilityLabel="Close"
          className="flex-1"
        />
      </RNModal>

      {open && (
        <View
          accessibilityRole="menu"
          className={cn(
            'absolute top-full z-50 mt-2 min-w-[12rem] rounded-lg border border-grey-2A bg-grey-22 p-1',
            align === 'end' ? 'right-0' : 'left-0',
            className
          )}
        >
          {items.map((item, i) => {
            if (item.kind === 'separator') {
              return <View key={i} accessibilityRole="none" className="my-1 h-px bg-grey-2A" />
            }
            if (item.kind === 'label') {
              return (
                <View key={i} className="px-3 py-1.5">
                  {typeof item.label === 'string' ? (
                    <Text className="text-xs font-medium uppercase tracking-wide text-text-muted">
                      {item.label}
                    </Text>
                  ) : (
                    item.label
                  )}
                </View>
              )
            }
            if (!isAction(item)) return null
            const action = item
            return (
              <Pressable
                key={i}
                accessibilityRole="menuitem"
                accessibilityState={{ disabled: action.disabled }}
                disabled={action.disabled}
                onPress={() => select(action)}
                className={cn(
                  'flex-row items-center gap-2.5 rounded-md px-3 py-2',
                  action.disabled && 'opacity-50',
                  action.danger && !action.disabled && 'active:bg-danger-tint',
                  !action.danger && !action.disabled && 'active:bg-grey-2A'
                )}
              >
                {action.icon != null && <View className="shrink-0">{action.icon}</View>}
                {typeof action.label === 'string' ? (
                  <Text className={cn('text-sm', action.danger ? 'text-danger' : 'text-text-primary')}>
                    {action.label}
                  </Text>
                ) : (
                  action.label
                )}
              </Pressable>
            )
          })}
        </View>
      )}
    </View>
  )
}
