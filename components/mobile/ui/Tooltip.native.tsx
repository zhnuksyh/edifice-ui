import { useState } from 'react'
import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps extends ViewProps {
  /** The tooltip text/content. String or nodes. */
  content: ReactNode
  /** Where the tooltip appears relative to the trigger. Defaults to 'top'. */
  placement?: TooltipPlacement
  /** The trigger element the tooltip describes. */
  children: ReactNode
  /** Extra NativeWind classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * Tooltip (native) — shows a small overlay bubble on long-press.
 *
 * Mirrors the web Tooltip props API. Touch has no hover, so the native tooltip
 * reveals on long-press and hides on release (the standard mobile pattern).
 * Absolutely positioned relative to the trigger; string `content` is wrapped in
 * styled <Text>.
 */
export function Tooltip({
  content,
  placement = 'top',
  children,
  className,
  ...rest
}: TooltipProps) {
  const [open, setOpen] = useState(false)

  const placements: Record<TooltipPlacement, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <View className={cn('relative self-start', className)} {...rest}>
      <Pressable
        onLongPress={() => setOpen(true)}
        onPressOut={() => setOpen(false)}
        delayLongPress={300}
        accessibilityRole="button"
      >
        {children}
      </Pressable>
      {open && (
        <View
          accessibilityRole="none"
          className={cn(
            'absolute z-50 max-w-xs rounded-md border border-grey-33 bg-grey-22 px-2.5 py-1.5',
            placements[placement]
          )}
        >
          {typeof content === 'string' ? (
            <Text className="text-xs font-medium text-grey-F0">{content}</Text>
          ) : (
            content
          )}
        </View>
      )}
    </View>
  )
}
