import { Children, type ReactNode } from 'react'
import { View, type ViewProps } from 'react-native'
import { cn } from '../../../utils/cn'

export type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 12
export type GridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface GridProps extends ViewProps {
  /** Column count. Defaults to 1. */
  cols?: GridCols
  /** Gap between cells. Defaults to 'md'. */
  gap?: GridGap
  /** Content. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/** Gap presets in px (matches the web gap scale: 0/4/8/16/24/32). */
const GAP_PX: Record<GridGap, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

/**
 * Grid (native) — a fixed-column grid built on flex-wrap.
 *
 * Mirrors the web Grid's `cols`/`gap` API. RN has no CSS grid or viewport
 * breakpoints, so cells wrap at an equal percentage width and the responsive
 * `sm/md/lgCols` props are omitted (a single device has one width). Gap is
 * applied as gutters around each cell, cancelled by a negative outer margin.
 */
export function Grid({ cols = 1, gap = 'md', children, className, ...rest }: GridProps) {
  const gutter = GAP_PX[gap] / 2
  const widthPct: `${number}%` = `${100 / cols}%`
  const cells = Children.toArray(children)

  return (
    <View
      className={cn('flex-row flex-wrap', className)}
      style={{ margin: -gutter }}
      {...rest}
    >
      {cells.map((child, i) => (
        <View key={i} style={{ width: widthPct, padding: gutter }}>
          {child}
        </View>
      ))}
    </View>
  )
}
