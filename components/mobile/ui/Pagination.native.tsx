import { View, Text, Pressable, type ViewProps } from 'react-native'
import { cn } from '../../../utils/cn'

export interface PaginationProps extends ViewProps {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  pageCount: number
  /** Called with the next page when a control is activated. */
  onPageChange: (page: number) => void
  /** How many page numbers to show around the current page. Defaults to 1. */
  siblingCount?: number
  /** Extra NativeWind classes merged via cn(). */
  className?: string
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
 * Pagination (native) — page navigation with previous/next and numbered pages.
 *
 * Mirrors the web Pagination props API. Truncates long ranges with ellipses
 * while always showing the first, last, and current page. Controlled via
 * `page`/`onPageChange`.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  className,
  ...rest
}: PaginationProps) {
  if (pageCount <= 1) return null

  const pages = buildRange(page, pageCount, siblingCount)
  const go = (p: number) => onPageChange(Math.min(Math.max(p, 1), pageCount))

  const arrowCls =
    'h-9 min-w-9 items-center justify-center rounded-md border border-grey-2A px-2'

  return (
    <View
      accessibilityRole="none"
      className={cn('flex-row items-center gap-1', className)}
      {...rest}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Previous page"
        accessibilityState={{ disabled: page <= 1 }}
        disabled={page <= 1}
        onPress={() => go(page - 1)}
        className={cn(arrowCls, page <= 1 && 'opacity-40')}
      >
        <Text className="text-sm text-text-secondary">‹</Text>
      </Pressable>

      {pages.map((p, i) =>
        typeof p === 'string' ? (
          <View key={`e${i}`} className="px-2">
            <Text className="text-text-muted">{p}</Text>
          </View>
        ) : (
          <Pressable
            key={p}
            accessibilityRole="button"
            accessibilityLabel={`Page ${p}`}
            accessibilityState={{ selected: p === page }}
            onPress={() => go(p)}
            className={cn(
              'h-9 min-w-9 items-center justify-center rounded-md px-2',
              p === page ? 'bg-yellow' : 'border border-grey-2A'
            )}
          >
            <Text
              className={cn(
                'text-sm',
                p === page ? 'font-medium text-grey-0A' : 'text-text-secondary'
              )}
            >
              {p}
            </Text>
          </Pressable>
        )
      )}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Next page"
        accessibilityState={{ disabled: page >= pageCount }}
        disabled={page >= pageCount}
        onPress={() => go(page + 1)}
        className={cn(arrowCls, page >= pageCount && 'opacity-40')}
      >
        <Text className="text-sm text-text-secondary">›</Text>
      </Pressable>
    </View>
  )
}
