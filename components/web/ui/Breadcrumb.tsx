import { Fragment, type HTMLAttributes, type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface BreadcrumbItem {
  label: ReactNode
  /** Link target; omit for the current (last) item. */
  href?: string
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  /** Trail items, root first. The last item is treated as the current page. */
  items: BreadcrumbItem[]
  /** Separator between items. Defaults to a chevron. */
  separator?: ReactNode
}

/**
 * Breadcrumb — a navigation trail showing the path to the current page.
 *
 * The final item is rendered as the current page (not a link) with
 * `aria-current="page"`.
 */
export function Breadcrumb({
  items,
  separator,
  className,
  ...rest
}: BreadcrumbProps) {
  if (items.length === 0) {
    return null
  }

  const sep = separator ?? (
    <ChevronRight
      className="h-4 w-4 text-text-muted"
      strokeWidth={2}
      aria-hidden="true"
    />
  )

  return (
    <nav aria-label="Breadcrumb" className={className} {...rest}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={i}>
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(isLast ? 'font-medium text-text-primary' : 'text-text-secondary')}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="text-text-secondary transition-colors duration-fast hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="flex items-center">
                  {sep}
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
