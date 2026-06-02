import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional icon/illustration shown above the title. */
  icon?: ReactNode
  /** Heading. */
  title: ReactNode
  /** Supporting description. */
  description?: ReactNode
  /** Optional action(s) — e.g. a Button. */
  action?: ReactNode
}

/**
 * EmptyState — a centered placeholder for "no data / nothing here yet" views.
 *
 * Use for empty lists, no search results, and first-run states (the empty case
 * every data view should handle).
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...rest
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-grey-2A px-6 py-12 text-center',
        className
      )}
      {...rest}
    >
      {icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-grey-22 text-text-secondary">
          {icon}
        </div>
      )}
      <div>
        <p className="font-display font-semibold text-text-primary">{title}</p>
        {description && (
          <p className="mx-auto mt-1 max-w-sm text-sm text-text-secondary">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
