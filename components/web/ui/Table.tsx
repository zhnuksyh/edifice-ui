import {
  createContext,
  useContext,
  type HTMLAttributes,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react'
import { cn } from '../../../utils/cn'

export type TableStyleVariant = 'lined' | 'striped' | 'bordered'

// The treatment is set on <Table> but applied by descendant sections, rows, and
// cells, so it is shared via context. The default ('lined') keeps the original
// look for any sub-component rendered without a <Table> ancestor.
const TableStyleContext = createContext<TableStyleVariant>('lined')

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Row/cell treatment, shared with the table's sections, rows, and cells.
   * Defaults to 'lined'.
   * - `lined` — horizontal row dividers only (the original).
   * - `striped` — zebra-striped body rows plus row dividers.
   * - `bordered` — a full grid: horizontal and vertical cell borders.
   */
  styleVariant?: TableStyleVariant
}
export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlight the row as selected. */
  selected?: boolean
  /** Apply interactive hover/cursor styling. */
  interactive?: boolean
}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment. Defaults to 'left'. */
  align?: 'left' | 'center' | 'right'
}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment. Defaults to 'left'. */
  align?: 'left' | 'center' | 'right'
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

/**
 * Table — styled, accessible table primitives.
 *
 * Compose `Table` > `TableHeader`/`TableBody` > `TableRow` > `TableHead`/
 * `TableCell` for full markup control. For a config-driven table with sorting,
 * use {@link DataTable}, which is built on these.
 */
export function Table({ styleVariant = 'lined', className, ...rest }: TableProps) {
  return (
    <TableStyleContext.Provider value={styleVariant}>
      <div className="w-full overflow-x-auto rounded-xl border border-grey-2A">
        <table
          className={cn('w-full border-collapse text-sm text-text-primary', className)}
          {...rest}
        />
      </div>
    </TableStyleContext.Provider>
  )
}

export function TableHeader({ className, ...rest }: TableSectionProps) {
  return <thead className={cn('bg-grey-1A', className)} {...rest} />
}

export function TableBody({ className, ...rest }: TableSectionProps) {
  const styleVariant = useContext(TableStyleContext)
  return (
    <tbody
      className={cn(
        // Bordered draws its lines from cell borders; the others divide rows.
        styleVariant !== 'bordered' && 'divide-y divide-grey-2A',
        styleVariant === 'striped' && '[&>tr:nth-child(even)]:bg-grey-1A',
        className
      )}
      {...rest}
    />
  )
}

export function TableRow({
  selected = false,
  interactive = false,
  className,
  ...rest
}: TableRowProps) {
  return (
    <tr
      aria-selected={selected || undefined}
      className={cn(
        'transition-colors duration-fast',
        interactive && 'cursor-pointer',
        // `!` keeps a selected row's highlight above the striped even-row fill.
        selected ? '!bg-yellow/10' : interactive && 'hover:bg-grey-1A',
        className
      )}
      {...rest}
    />
  )
}

export function TableHead({ align = 'left', className, ...rest }: TableHeadProps) {
  const styleVariant = useContext(TableStyleContext)
  return (
    <th
      scope="col"
      className={cn(
        'px-4 py-3 font-medium text-text-secondary',
        styleVariant === 'bordered' && 'border border-grey-2A',
        alignClass[align],
        className
      )}
      {...rest}
    />
  )
}

export function TableCell({ align = 'left', className, ...rest }: TableCellProps) {
  const styleVariant = useContext(TableStyleContext)
  return (
    <td
      className={cn(
        'px-4 py-3 align-middle',
        styleVariant === 'bordered' && 'border border-grey-2A',
        alignClass[align],
        className
      )}
      {...rest}
    />
  )
}
