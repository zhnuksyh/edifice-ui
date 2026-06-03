import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Base column count. Defaults to 1. */
  cols?: GridCols
  /** Column count at the `sm` breakpoint and up. */
  smCols?: GridCols
  /** Column count at the `md` breakpoint and up. */
  mdCols?: GridCols
  /** Column count at the `lg` breakpoint and up. */
  lgCols?: GridCols
  /** Gap between cells. Defaults to 'md'. */
  gap?: GridGap
  /** Content. */
  children: ReactNode
}

// Full class strings — Tailwind can't see dynamically-built names.
const BASE: Record<GridCols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
}

const SM: Record<GridCols, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
  12: 'sm:grid-cols-12',
}

const MD: Record<GridCols, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
  12: 'md:grid-cols-12',
}

const LG: Record<GridCols, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  12: 'lg:grid-cols-12',
}

const GAPS: Record<GridGap, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

/**
 * Grid — a responsive CSS grid primitive with per-breakpoint column counts.
 *
 * Set a base `cols` and optionally `smCols`/`mdCols`/`lgCols` to change the
 * count at larger breakpoints. Use Stack for one-dimensional layouts.
 */
export function Grid({
  cols = 1,
  smCols,
  mdCols,
  lgCols,
  gap = 'md',
  children,
  className,
  ...rest
}: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        BASE[cols],
        smCols && SM[smCols],
        mdCols && MD[mdCols],
        lgCols && LG[lgCols],
        GAPS[gap],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
