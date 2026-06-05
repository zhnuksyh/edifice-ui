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
export type BadgeStyleVariant = 'soft' | 'solid' | 'outline'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tone (hue). Defaults to 'neutral'. */
  variant?: BadgeVariant
  /** Size preset. Defaults to 'md'. */
  size?: BadgeSize
  /**
   * Visual treatment. Defaults to 'soft'.
   * - `soft` — tinted background with a same-hue ring (the original look).
   * - `solid` — filled hue background with contrasting text.
   * - `outline` — transparent with a hue border and hue text.
   */
  styleVariant?: BadgeStyleVariant
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
  styleVariant = 'soft',
  pill = false,
  children,
  className,
  ...rest
}: BadgeProps) {
  // soft — tinted bg + same-hue ring (the original look, crisp against dark).
  const soft: Record<BadgeVariant, string> = {
    neutral: 'bg-grey-22 text-grey-F0 ring-1 ring-inset ring-grey-2A',
    primary: 'bg-yellow-tint text-yellow ring-1 ring-inset ring-yellow/20',
    success: 'bg-success-tint text-success ring-1 ring-inset ring-success/20',
    warning: 'bg-warning-tint text-warning ring-1 ring-inset ring-warning/20',
    danger: 'bg-danger-tint text-danger ring-1 ring-inset ring-danger/20',
    info: 'bg-info-tint text-info ring-1 ring-inset ring-info/20',
    purple: 'bg-purple-tint text-purple ring-1 ring-inset ring-purple/20',
  }

  // solid — filled hue bg with contrasting text.
  const solid: Record<BadgeVariant, string> = {
    neutral: 'bg-grey-F0 text-grey-0A',
    primary: 'bg-yellow text-text-inverse',
    success: 'bg-success text-text-inverse',
    warning: 'bg-warning text-text-inverse',
    danger: 'bg-danger text-text-inverse',
    info: 'bg-info text-text-inverse',
    purple: 'bg-purple text-white',
  }

  // outline — transparent with a hue border + hue text.
  const outline: Record<BadgeVariant, string> = {
    neutral: 'text-grey-F0 ring-1 ring-inset ring-grey-44',
    primary: 'text-yellow ring-1 ring-inset ring-yellow',
    success: 'text-success ring-1 ring-inset ring-success',
    warning: 'text-warning ring-1 ring-inset ring-warning',
    danger: 'text-danger ring-1 ring-inset ring-danger',
    info: 'text-info ring-1 ring-inset ring-info',
    purple: 'text-purple ring-1 ring-inset ring-purple',
  }

  const treatments: Record<BadgeStyleVariant, Record<BadgeVariant, string>> = {
    soft,
    solid,
    outline,
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
        treatments[styleVariant][variant],
        sizes[size],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
