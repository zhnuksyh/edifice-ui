import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export type SkeletonVariant = 'text' | 'circle' | 'rect'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shape. Defaults to 'text'. */
  variant?: SkeletonVariant
  /** Width (number → px, or any CSS length). */
  width?: number | string
  /** Height (number → px, or any CSS length). */
  height?: number | string
  /** For `text`: render this many stacked lines. Defaults to 1. */
  lines?: number
}

function toCss(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

/**
 * Skeleton — an animated placeholder for content that is still loading.
 *
 * `text` renders one or more lines; `circle` an avatar-style dot; `rect` a
 * block (cards, images, thumbnails).
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  style,
  ...rest
}: SkeletonProps) {
  const base = 'animate-skeleton-pulse bg-grey-2A'

  if (variant === 'text' && lines > 1) {
    return (
      <div className="flex flex-col gap-2" {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(base, 'h-4 rounded', className)}
            // Last line is shorter for a natural paragraph look.
            style={{ width: i === lines - 1 ? '70%' : toCss(width) ?? '100%' }}
          />
        ))}
      </div>
    )
  }

  const shape: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  }

  const dims: CSSProperties = {
    width: toCss(width) ?? (variant === 'text' ? '100%' : undefined),
    height: toCss(height),
    ...style,
  }

  return <div className={cn(base, shape[variant], className)} style={dims} {...rest} />
}
