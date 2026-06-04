import { View, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type StackDirection = 'row' | 'col'
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around'

export interface StackProps extends ViewProps {
  /** Main axis. Defaults to 'col'. */
  direction?: StackDirection
  /** Gap between children. Defaults to 'md'. */
  gap?: StackGap
  /** Cross-axis alignment (align-items). */
  align?: StackAlign
  /** Main-axis distribution (justify-content). */
  justify?: StackJustify
  /** Allow children to wrap (row direction). */
  wrap?: boolean
  /** Content. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Stack (native) — a flexbox primitive for laying children in a row or column.
 *
 * Mirrors the web Stack props API. Pick a `direction` and `gap`, optionally set
 * `align`/`justify`. Use Grid for 2D layouts.
 */
export function Stack({
  direction = 'col',
  gap = 'md',
  align,
  justify,
  wrap = false,
  children,
  className,
  ...rest
}: StackProps) {
  const gaps: Record<StackGap, string> = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  const aligns: Record<StackAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  }

  const justifies: Record<StackJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
  }

  return (
    <View
      className={cn(
        direction === 'row' ? 'flex-row' : 'flex-col',
        gaps[gap],
        align && aligns[align],
        justify && justifies[justify],
        wrap && 'flex-wrap',
        className
      )}
      {...rest}
    >
      {children}
    </View>
  )
}
