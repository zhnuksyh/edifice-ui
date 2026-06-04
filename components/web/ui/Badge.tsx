import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tone. Defaults to 'neutral'. */
  variant?: BadgeVariant
  /** Size preset. Defaults to 'md'. */
  size?: BadgeSize
  /** Render as a pill (fully rounded) instead of a rounded rectangle. */
  pill?: boolean
  /** Badge content. */
  children: ReactNode
}

/**
 * Badge — a small label for statuses, counts, and tags.
 */
export function Badge({
  variant = 'neutral',
  size = 'md',
  pill = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  // A subtle same-hue ring gives each badge a crisp edge against the dark surface.
  const variants: Record<BadgeVariant, string> = {
    neutral: 'bg-grey-22 text-grey-F0 ring-1 ring-inset ring-grey-2A',
    primary: 'bg-yellow-tint text-yellow ring-1 ring-inset ring-yellow/20',
    success: 'bg-success-tint text-success ring-1 ring-inset ring-success/20',
    warning: 'bg-warning-tint text-warning ring-1 ring-inset ring-warning/20',
    danger: 'bg-danger-tint text-danger ring-1 ring-inset ring-danger/20',
    info: 'bg-info-tint text-info ring-1 ring-inset ring-info/20',
    purple: 'bg-purple-tint text-purple ring-1 ring-inset ring-purple/20',
  }

  const sizes: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium',
        pill ? 'rounded-full' : 'rounded-md',
        variants[variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
