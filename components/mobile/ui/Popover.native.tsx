import { useState } from 'react'
import { Modal as RNModal, View, Pressable } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type PopoverPlacement = 'top' | 'bottom'

export interface PopoverProps {
  /** The element that toggles the popover (rendered as the anchor). */
  trigger: ReactNode
  /** Panel content. */
  children: ReactNode
  /** Side of the trigger to place the panel. Defaults to 'bottom'. */
  placement?: PopoverPlacement
  /** Controlled open state. */
  open?: boolean
  /** Called when open state should change (controlled or uncontrolled). */
  onOpenChange?: (open: boolean) => void
  /** Extra NativeWind classes merged onto the floating panel via cn(). */
  className?: string
}

/**
 * Popover (native) — a floating panel anchored to a trigger.
 *
 * Mirrors the web Popover props API (minus left/right placement, which needs
 * trigger measurement). Opens on trigger press; a transparent backdrop closes
 * it on outside press (and Android back). Controlled via `open`/`onOpenChange`,
 * or uncontrolled.
 */
export function Popover({
  trigger,
  children,
  placement = 'bottom',
  open,
  onOpenChange,
  className,
}: PopoverProps) {
  const isControlled = open !== undefined
  const [internal, setInternal] = useState(false)
  const isOpen = isControlled ? open : internal

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternal(next)
    onOpenChange?.(next)
  }

  return (
    <View className="relative self-start">
      <Pressable onPress={() => setOpen(!isOpen)} accessibilityRole="button">
        {trigger}
      </Pressable>

      <RNModal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Full-screen backdrop closes the popover on outside press. */}
        <Pressable
          onPress={() => setOpen(false)}
          accessibilityLabel="Close"
          className="flex-1"
        />
      </RNModal>

      {isOpen && (
        <View
          accessibilityRole="none"
          className={cn(
            'absolute z-50 min-w-[12rem] rounded-lg border border-grey-2A bg-grey-22 p-3',
            placement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
            className
          )}
        >
          {children}
        </View>
      )}
    </View>
  )
}
