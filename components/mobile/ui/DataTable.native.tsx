import { useMemo, useState } from 'react'
import { View, Text, Pressable, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type SortDirection = 'asc' | 'desc'

export interface DataTableColumn<T> {
  /** Stable column key. */
  key: string
  /** Field label (shown beside each value in the card). String or nodes. */
  header: ReactNode
  /** Cell value getter (used for rendering and default sorting). */
  accessor: (row: T) => ReactNode
  /** Custom cell renderer; falls back to `accessor` when omitted. */
  cell?: (row: T) => ReactNode
  /** Enable sorting on this column (adds a sort chip above the list). */
  sortable?: boolean
  /**
   * Value used for sorting; defaults to `accessor`. Provide for correct numeric
   * or date ordering when the rendered value isn't directly comparable.
   */
  sortValue?: (row: T) => string | number
}

export interface DataTableProps<T> extends ViewProps {
  /** Column definitions (each becomes a labelled field in every card). */
  columns: DataTableColumn<T>[]
  /** Row data. */
  data: T[]
  /** Stable key for each row. */
  rowKey: (row: T, index: number) => string | number
  /** Called when a row card is pressed (makes cards interactive). */
  onRowClick?: (row: T) => void
  /** Predicate marking a row as selected. */
  isRowSelected?: (row: T) => boolean
  /** Content shown when `data` is empty. String or nodes. */
  emptyState?: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

interface SortState {
  key: string
  direction: SortDirection
}

/**
 * DataTable (native) — a config-driven record list rendered as cards.
 *
 * Mirrors the web DataTable's `columns`/`data` API, but reflows the grid into a
 * mobile-native card list: each row is a card of label/value field rows (a
 * literal table reads poorly on a phone). Sortable columns surface as a row of
 * sort chips above the list (press to cycle asc → desc → none) since there are
 * no column headers to tap. Custom `cell` renderers, row selection, press
 * handling, and an empty state are preserved.
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  isRowSelected,
  emptyState = 'No data',
  className,
  ...rest
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null)

  const sorted = useMemo(() => {
    if (!sort) return data
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return data
    const getValue = col.sortValue ?? ((row: T) => col.accessor(row) as string | number)
    const factor = sort.direction === 'asc' ? 1 : -1
    return [...data].sort((a, b) => {
      const av = getValue(a)
      const bv = getValue(b)
      if (av < bv) return -1 * factor
      if (av > bv) return 1 * factor
      return 0
    })
  }, [data, sort, columns])

  // Cycle a column: asc → desc → unsorted.
  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: 'asc' }
      if (prev.direction === 'asc') return { key, direction: 'desc' }
      return null
    })
  }

  const sortableColumns = columns.filter((c) => c.sortable)

  if (data.length === 0) {
    return (
      <View
        className={cn(
          'items-center rounded-xl border border-grey-2A py-10',
          className
        )}
        {...rest}
      >
        {typeof emptyState === 'string' ? (
          <Text className="text-text-muted">{emptyState}</Text>
        ) : (
          emptyState
        )}
      </View>
    )
  }

  return (
    <View className={cn('gap-3', className)} {...rest}>
      {sortableColumns.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {sortableColumns.map((col) => {
            const active = sort?.key === col.key
            const arrow = !active ? '↕' : sort?.direction === 'asc' ? '↑' : '↓'
            return (
              <Pressable
                key={col.key}
                onPress={() => toggleSort(col.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                className={cn(
                  'flex-row items-center gap-1 rounded-full border px-3 py-1',
                  active ? 'border-yellow bg-yellow-tint' : 'border-grey-2A'
                )}
              >
                <Text
                  className={cn(
                    'text-xs font-medium',
                    active ? 'text-yellow' : 'text-text-secondary'
                  )}
                >
                  {typeof col.header === 'string' ? col.header : col.key}
                </Text>
                <Text className={cn('text-xs', active ? 'text-yellow' : 'text-text-muted')}>
                  {arrow}
                </Text>
              </Pressable>
            )
          })}
        </View>
      )}

      {sorted.map((row, i) => {
        const selected = isRowSelected?.(row)
        const card = (
          <View
            className={cn(
              'gap-2 rounded-xl border bg-surface p-4',
              selected ? 'border-yellow bg-yellow-tint' : 'border-grey-2A'
            )}
          >
            {columns.map((col) => (
              <View key={col.key} className="flex-row items-start justify-between gap-4">
                {typeof col.header === 'string' ? (
                  <Text className="flex-1 text-sm font-medium text-text-secondary">
                    {col.header}
                  </Text>
                ) : (
                  <View className="flex-1">{col.header}</View>
                )}
                <View className="flex-[2] items-end">
                  {renderValue(col.cell ? col.cell(row) : col.accessor(row))}
                </View>
              </View>
            ))}
          </View>
        )

        if (!onRowClick) {
          return <View key={rowKey(row, i)}>{card}</View>
        }
        return (
          <Pressable
            key={rowKey(row, i)}
            onPress={() => onRowClick(row)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            {card}
          </Pressable>
        )
      })}
    </View>
  )
}

/** Wrap bare string/number cell output in styled <Text>; pass nodes through. */
function renderValue(value: ReactNode): ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return <Text className="text-right text-sm text-text-primary">{value}</Text>
  }
  return value
}
