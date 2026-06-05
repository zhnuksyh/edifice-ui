import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'
export type TooltipStyleVariant = 'dark' | 'light'

export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  /** The tooltip text/content. */
  content: ReactNode
  /** Where the tooltip appears relative to the trigger. Defaults to 'top'. */
  placement?: TooltipPlacement
  /**
   * Color scheme. Defaults to 'dark'.
   * - `dark` — elevated grey surface, light text (the original look).
   * - `light` — light surface, dark text (for use over dark imagery/panels).
   */
  styleVariant?: TooltipStyleVariant
  /** The trigger element the tooltip describes. */
  children: ReactNode
}

/**
 * Tooltip — shows a small overlay on hover and keyboard focus.
 *
 * CSS-positioned (no portal); wrap an interactive trigger so it is reachable by
 * keyboard. The tooltip is hidden from layout until shown.
 */
export function Tooltip({
  content,
  placement = 'top',
  styleVariant = 'dark',
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

  const schemes: Record<TooltipStyleVariant, string> = {
    dark: 'border-grey-33 bg-grey-22 text-grey-F0',
    light: 'border-grey-CC bg-grey-F0 text-grey-0A',
  }

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      {...rest}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 w-max max-w-xs whitespace-normal rounded-md border px-2.5 py-1.5 text-xs font-medium shadow-lg',
            schemes[styleVariant],
            placements[placement]
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
