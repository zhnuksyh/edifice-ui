import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type KbdSize = 'sm' | 'md'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Size preset. Defaults to 'md'. */
  size?: KbdSize
  /** Key label (e.g. '⌘', 'Ctrl', 'K'). */
  children: ReactNode
}

/**
 * Kbd — a keyboard key cap for documenting shortcuts.
 *
 * Render multiple side by side for combos, e.g. `<Kbd>⌘</Kbd><Kbd>K</Kbd>`.
 */
export function Kbd({ size = 'md', children, className, ...rest }: KbdProps) {
  const sizes: Record<KbdSize, string> = {
    sm: 'h-5 min-w-5 px-1 text-[11px]',
    md: 'h-6 min-w-6 px-1.5 text-xs',
  }

  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center rounded border border-grey-2A border-b-2 bg-grey-22 font-mono font-medium text-text-secondary',
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </kbd>
  )
}
