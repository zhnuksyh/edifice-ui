import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
export type PopoverAlign = 'start' | 'center' | 'end'

export interface PopoverProps {
  /** The element that toggles the popover (rendered as the anchor). */
  trigger: ReactNode
  /** Panel content. */
  children: ReactNode
  /** Side of the trigger to place the panel. Defaults to 'bottom'. */
  placement?: PopoverPlacement
  /** Cross-axis alignment. Defaults to 'center'. */
  align?: PopoverAlign
  /** Controlled open state. */
  open?: boolean
  /** Called when open state should change (controlled or uncontrolled). */
  onOpenChange?: (open: boolean) => void
  /** Extra classes merged onto the floating panel via cn(). */
  className?: string
}

/**
 * Popover — a floating panel anchored to a trigger.
 *
 * Opens on trigger click; closes on outside click and Escape. CSS-positioned
 * (no portal). Controlled via `open`/`onOpenChange`, or uncontrolled.
 */
export function Popover({
  trigger,
  children,
  placement = 'bottom',
  align = 'center',
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

  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), isOpen)

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const placements: Record<PopoverPlacement, string> = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2 top-0',
    right: 'left-full ml-2 top-0',
  }

  const aligns: Record<PopoverAlign, string> = {
    start: placement === 'left' || placement === 'right' ? 'top-0' : 'left-0',
    center:
      placement === 'left' || placement === 'right'
        ? 'top-1/2 -translate-y-1/2'
        : 'left-1/2 -translate-x-1/2',
    end: placement === 'left' || placement === 'right' ? 'bottom-0' : 'right-0',
  }

  return (
    <div ref={ref} className="relative inline-flex">
      <span onClick={() => setOpen(!isOpen)} className="contents">
        {trigger}
      </span>
      {isOpen && (
        <div
          role="dialog"
          className={cn(
            'absolute z-50 min-w-[12rem] rounded-lg border border-grey-2A bg-grey-22 p-3 text-sm text-text-primary shadow-xl',
            placements[placement],
            aligns[align],
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
