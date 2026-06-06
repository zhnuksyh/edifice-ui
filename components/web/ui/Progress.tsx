import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressTone = 'primary' | 'success' | 'danger'

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Current value 0–max. Omit for an indeterminate bar. */
  value?: number
  /** Maximum value. Defaults to 100. */
  max?: number
  /** Bar thickness. Defaults to 'md'. */
  size?: ProgressSize
  /** Fill color tone. Defaults to 'primary'. */
  tone?: ProgressTone
  /** Accessible label. */
  label?: string
}

/**
 * Progress — a linear progress bar.
 *
 * Determinate when `value` is provided (0–`max`); indeterminate (animated
 * sweep) when `value` is omitted.
 */
export function Progress({
  value,
  max = 100,
  size = 'md',
  tone = 'primary',
  label = 'Loading',
  className,
  ...rest
}: ProgressProps) {
  const indeterminate = value === undefined
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100))

  const sizes: Record<ProgressSize, string> = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const tones: Record<ProgressTone, string> = {
    primary: 'bg-yellow',
    success: 'bg-success',
    danger: 'bg-danger',
  }

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : max}
      aria-valuenow={indeterminate ? undefined : value}
      className={cn('w-full overflow-hidden rounded-full bg-grey-2A', sizes[size], className)}
      {...rest}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-normal',
          tones[tone],
          indeterminate && 'w-1/3 animate-progress-indeterminate'
        )}
        style={indeterminate ? undefined : { width: `${pct}%` }}
      />
    </div>
  )
}
