import { useMemo, useState, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table'

export type SortDirection = 'asc' | 'desc'

export interface DataTableColumn<T> {
  /** Stable column key. */
  key: string
  /** Header label. */
  header: ReactNode
  /** Cell value getter (used for rendering and default sorting). */
  accessor: (row: T) => ReactNode
  /** Custom cell renderer; falls back to `accessor` when omitted. */
  cell?: (row: T) => ReactNode
  /** Enable sorting on this column. */
  sortable?: boolean
  /**
   * Value used for sorting; defaults to `accessor`. Provide for correct numeric
   * or date ordering when the rendered value isn't directly comparable.
   */
  sortValue?: (row: T) => string | number
  /** Text alignment. Defaults to 'left'. */
  align?: 'left' | 'center' | 'right'
  /** Fixed column width (CSS length). */
  width?: string
}

export interface DataTableProps<T> {
  /** Column definitions. */
  columns: DataTableColumn<T>[]
  /** Row data. */
  data: T[]
  /** Stable key for each row. */
  rowKey: (row: T, index: number) => string | number
  /** Called when a row is clicked (makes rows interactive). */
  onRowClick?: (row: T) => void
  /** Predicate marking a row as selected. */
  isRowSelected?: (row: T) => boolean
  /** Content shown when `data` is empty. */
  emptyState?: ReactNode
  /** Extra classes merged onto the table via cn(). */
  className?: string
}

interface SortState {
  key: string
  direction: SortDirection
}

/**
 * DataTable — a config-driven table with sortable columns and row states.
 *
 * Pass `columns` + `data`; get sorting (click a sortable header to cycle
 * asc → desc → none), hover/selected row states, custom cell renderers, and an
 * empty state. Built on the {@link Table} primitives.
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  isRowSelected,
  emptyState = 'No data',
  className,
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

  if (data.length === 0) {
    return (
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key} align={col.align} style={{ width: col.width }}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={columns.length} className="py-10 text-text-muted">
              {emptyState}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((col) => {
            const active = sort?.key === col.key
            return (
              <TableHead key={col.key} align={col.align} style={{ width: col.width }}>
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(col.key)}
                    aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={cn(
                      'inline-flex items-center gap-1.5 font-medium transition-colors duration-fast hover:text-text-primary',
                      active && 'text-text-primary'
                    )}
                  >
                    {col.header}
                    <SortIcon active={active} direction={sort?.direction} />
                  </button>
                ) : (
                  col.header
                )}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((row, i) => (
          <TableRow
            key={rowKey(row, i)}
            interactive={Boolean(onRowClick)}
            selected={isRowSelected?.(row)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
          >
            {columns.map((col) => (
              <TableCell key={col.key} align={col.align}>
                {col.cell ? col.cell(row) : col.accessor(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/** Sort direction indicator; dims to a neutral glyph when the column is inactive. */
function SortIcon({ active, direction }: { active: boolean; direction?: SortDirection }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-3.5 w-3.5', active ? 'text-text-primary' : 'text-text-muted')}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {active && direction === 'asc' ? (
        <path d="m18 15-6-6-6 6" />
      ) : active && direction === 'desc' ? (
        <path d="m6 9 6 6 6-6" />
      ) : (
        <path d="m8 9 4-4 4 4M8 15l4 4 4-4" />
      )}
    </svg>
  )
}
