import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
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
  const variants: Record<BadgeVariant, string> = {
    neutral: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary-100 text-primary-700',
    success: 'bg-success-light/40 text-success-dark',
    warning: 'bg-warning-light/40 text-warning-dark',
    danger: 'bg-danger-light/40 text-danger-dark',
    info: 'bg-info-light/40 text-info-dark',
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
