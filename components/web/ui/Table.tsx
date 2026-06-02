import type {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react'
import { cn } from '../../../utils/cn'

export type TableProps = TableHTMLAttributes<HTMLTableElement>
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
export function Table({ className, ...rest }: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-grey-2A">
      <table
        className={cn('w-full border-collapse text-sm text-text-primary', className)}
        {...rest}
      />
    </div>
  )
}

export function TableHeader({ className, ...rest }: TableSectionProps) {
  return <thead className={cn('bg-grey-1A', className)} {...rest} />
}

export function TableBody({ className, ...rest }: TableSectionProps) {
  return <tbody className={cn('divide-y divide-grey-2A', className)} {...rest} />
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
        selected ? 'bg-primary-600/10' : interactive && 'hover:bg-grey-1A',
        className
      )}
      {...rest}
    />
  )
}

export function TableHead({ align = 'left', className, ...rest }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        'px-4 py-3 font-medium text-text-secondary',
        alignClass[align],
        className
      )}
      {...rest}
    />
  )
}

export function TableCell({ align = 'left', className, ...rest }: TableCellProps) {
  return (
    <td className={cn('px-4 py-3 align-middle', alignClass[align], className)} {...rest} />
  )
}
