import { Modal as RNModal, View, Text, Pressable } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg'

export interface DrawerProps {
  /** Whether the drawer is visible. */
  isOpen: boolean
  /** Called when the user dismisses the drawer (backdrop press / Android back). */
  onClose: () => void
  /** Edge the panel sits against. Defaults to 'right'. */
  side?: DrawerSide
  /** Panel size (width for left/right, height for top/bottom). Defaults to 'md'. */
  size?: DrawerSize
  /** Optional heading. String or nodes. */
  title?: ReactNode
  /** Optional footer (actions). */
  footer?: ReactNode
  /** Drawer body. */
  children: ReactNode
  /** Extra NativeWind classes merged onto the panel via cn(). */
  className?: string
}

/**
 * Drawer (native) — a panel anchored to a screen edge over an overlay.
 *
 * Mirrors the web Drawer props API, built on RN's `Modal`. Closes on backdrop
 * press and the Android back button. Use `side` to pick the edge; the consumer
 * controls open state. String `title` is wrapped in styled <Text>.
 */
export function Drawer({
  isOpen,
  onClose,
  side = 'right',
  size = 'md',
  title,
  footer,
  children,
  className,
}: DrawerProps) {
  const isHorizontal = side === 'left' || side === 'right'

  // The backdrop container aligns the panel to the chosen edge.
  const justify: Record<DrawerSide, string> = {
    left: 'flex-row justify-start',
    right: 'flex-row justify-end',
    top: 'flex-col justify-start',
    bottom: 'flex-col justify-end',
  }

  const borders: Record<DrawerSide, string> = {
    left: 'border-r',
    right: 'border-l',
    top: 'border-b',
    bottom: 'border-t',
  }

  const widths: Record<DrawerSize, string> = {
    sm: 'w-72',
    md: 'w-96',
    lg: 'w-[32rem]',
  }

  const heights: Record<DrawerSize, string> = {
    sm: 'h-1/4',
    md: 'h-1/3',
    lg: 'h-1/2',
  }

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        onPress={onClose}
        accessibilityLabel="Close"
        className={cn('flex-1 bg-overlay', justify[side])}
      >
        <Pressable
          accessibilityRole="none"
          onPress={() => {}}
          className={cn(
            'flex-col border-grey-2A bg-surface',
            borders[side],
            isHorizontal ? cn('h-full', widths[size]) : cn('w-full', heights[size]),
            className
          )}
        >
          {title != null &&
            (typeof title === 'string' ? (
              <Text className="px-6 pb-3 pt-5 text-lg font-semibold text-text-primary">
                {title}
              </Text>
            ) : (
              <View className="px-6 pb-3 pt-5">{title}</View>
            ))}
          <View className="flex-1 px-6 py-3">{children}</View>
          {footer != null && (
            <View className="flex-row justify-end gap-3 border-t border-grey-2A px-6 py-4">
              {footer}
            </View>
          )}
        </Pressable>
      </Pressable>
    </RNModal>
  )
}
