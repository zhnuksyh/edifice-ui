import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface PageShellProps extends HTMLAttributes<HTMLElement> {
  /** Rendered above the content. */
  navbar?: ReactNode
  /** Rendered below the content. */
  footer?: ReactNode
  /**
   * Constrain main content to a centered max-width container with gutters.
   * Defaults to true.
   */
  contained?: boolean
  /** Main page content. */
  children: ReactNode
}

/**
 * PageShell — top-level page wrapper that composes a navbar, main content
 * area, and footer into a full-height column.
 */
export function PageShell({
  navbar,
  footer,
  contained = true,
  children,
  className,
  ...rest
}: PageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      {navbar}
      <main
        className={cn(
          'flex-1',
          contained && 'mx-auto w-full max-w-screen-xl px-6 py-12',
          className
        )}
        {...rest}
      >
        {children}
      </main>
      {footer}
    </div>
  )
}
