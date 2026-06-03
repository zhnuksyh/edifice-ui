import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type KbdSize = 'sm' | 'md'

export interface KbdProps extends ViewProps {
  /** Size preset. Defaults to 'md'. */
  size?: KbdSize
  /** Key label (e.g. '⌘', 'Ctrl', 'K'). String or nodes. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Kbd (native) — a keyboard key cap for documenting shortcuts.
 *
 * Mirrors the web Kbd props API. Render multiple side by side for combos.
 * String children are wrapped in styled <Text> automatically.
 */
export function Kbd({ size = 'md', children, className, ...rest }: KbdProps) {
  const containers: Record<KbdSize, string> = {
    sm: 'h-5 min-w-5 px-1',
    md: 'h-6 min-w-6 px-1.5',
  }

  const texts: Record<KbdSize, string> = {
    sm: 'text-[11px]',
    md: 'text-xs',
  }

  return (
    <View
      className={cn(
        'flex-row items-center justify-center self-start rounded border border-b-2 border-grey-2A bg-grey-22',
        containers[size],
        className
      )}
      {...rest}
    >
      {typeof children === 'string' ? (
        <Text className={cn('font-mono font-medium text-text-secondary', texts[size])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}
