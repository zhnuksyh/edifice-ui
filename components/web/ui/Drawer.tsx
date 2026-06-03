import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg'

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the drawer is visible. */
  isOpen: boolean
  /** Called when the user dismisses the drawer. */
  onClose: () => void
  /** Edge the panel slides in from. Defaults to 'right'. */
  side?: DrawerSide
  /** Panel size (width for left/right, height for top/bottom). Defaults to 'md'. */
  size?: DrawerSize
  /** Optional heading. */
  title?: ReactNode
  /** Optional footer (actions). */
  footer?: ReactNode
  /** Drawer body. */
  children: ReactNode
}

/**
 * Drawer — a panel that slides in from a screen edge over an overlay.
 *
 * Closes on overlay click and Escape key. Renders nothing when `isOpen` is
 * false. Use `side` to pick the edge; the consumer controls open state.
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
  ...rest
}: DrawerProps) {
  const panelRef = useClickOutside<HTMLDivElement>(() => onClose?.(), isOpen)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const isHorizontal = side === 'left' || side === 'right'

  const sides: Record<DrawerSide, string> = {
    left: 'left-0 top-0 h-full border-r',
    right: 'right-0 top-0 h-full border-l',
    top: 'top-0 left-0 w-full border-b',
    bottom: 'bottom-0 left-0 w-full border-t',
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
    <div
      className="fixed inset-0 z-50 bg-overlay"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className={cn(
          'absolute flex max-w-full max-h-full flex-col bg-surface shadow-2xl border-grey-2A',
          sides[side],
          isHorizontal ? widths[size] : heights[size],
          className
        )}
        {...rest}
      >
        {title && (
          <div className="shrink-0 px-6 pt-5 pb-3 text-lg font-semibold text-text-primary">
            {title}
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-6 py-3 text-text-secondary">
          {children}
        </div>
        {footer && (
          <div className="flex shrink-0 justify-end gap-3 border-t border-grey-2A px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
