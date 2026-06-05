import type { HTMLAttributes } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../../utils/cn'

export interface PaginationProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  pageCount: number
  /** Called with the next page when a control is activated. */
  onPageChange: (page: number) => void
  /** How many page numbers to show around the current page. Defaults to 1. */
  siblingCount?: number
}

const ELLIPSIS = '…'

/**
 * Build the page list with ellipsis truncation, always showing the first and
 * last page plus a window of siblings around the current page.
 */
function buildRange(page: number, pageCount: number, siblings: number): (number | string)[] {
  const total = siblings * 2 + 5 // first, last, current, 2 ellipses, siblings
  if (pageCount <= total) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const left = Math.max(page - siblings, 1)
  const right = Math.min(page + siblings, pageCount)
  const showLeftEllipsis = left > 2
  const showRightEllipsis = right < pageCount - 1

  const range: (number | string)[] = [1]
  if (showLeftEllipsis) range.push(ELLIPSIS)
  for (let i = showLeftEllipsis ? left : 2; i <= (showRightEllipsis ? right : pageCount - 1); i++) {
    range.push(i)
  }
  if (showRightEllipsis) range.push(ELLIPSIS)
  range.push(pageCount)
  return range
}

/**
 * Pagination — page navigation with previous/next and numbered pages.
 *
 * Truncates long ranges with ellipses while always showing the first, last, and
 * current page. Controlled via `page`/`onPageChange`.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) {
  if (pageCount <= 1) {
    return null
  }

  const pages = buildRange(page, pageCount, siblingCount)
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), pageCount))

  const arrow =
    'inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-grey-2A px-2 text-sm text-text-secondary transition-colors duration-fast hover:border-grey-44 hover:text-text-primary disabled:pointer-events-none disabled:opacity-40'

  return (
    <nav aria-label="Pagination" className={cn('flex items-center gap-1', className)} {...rest}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        className={arrow}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </button>

      {pages.map((p, i) =>
        typeof p === 'string' ? (
          <span key={`e${i}`} className="px-2 text-text-muted" aria-hidden="true">
            {p}
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => go(p)}
            className={cn(
              'inline-flex h-9 min-w-9 items-center justify-center rounded-md px-2 text-sm transition-colors duration-fast',
              p === page
                ? 'bg-primary-600 font-medium text-text-inverse'
                : 'border border-grey-2A text-text-secondary hover:border-grey-44 hover:text-text-primary'
            )}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= pageCount}
        onClick={() => go(page + 1)}
        className={arrow}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </button>
    </nav>
  )
}
