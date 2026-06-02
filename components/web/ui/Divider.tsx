import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type DividerOrientation = 'horizontal' | 'vertical'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Line direction. Defaults to 'horizontal'. */
  orientation?: DividerOrientation
  /** Optional centered label (horizontal only). */
  label?: ReactNode
}

/**
 * Divider — a separator line, optionally with a centered label.
 *
 * Horizontal by default; `vertical` for inline separation (give the parent a
 * height). A `label` splits a horizontal divider with centered text.
 */
export function Divider({
  orientation = 'horizontal',
  label,
  className,
  ...rest
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('mx-2 h-full w-px self-stretch bg-grey-2A', className)}
        {...rest}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-3', className)}
        {...rest}
      >
        <span className="h-px flex-1 bg-grey-2A" />
        <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </span>
        <span className="h-px flex-1 bg-grey-2A" />
      </div>
    )
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn('h-px w-full bg-grey-2A', className)}
      {...rest}
    />
  )
}
