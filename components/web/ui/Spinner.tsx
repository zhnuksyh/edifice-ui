import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export type SpinnerSize = 'sm' | 'md' | 'lg'
export type SpinnerTone = 'primary' | 'neutral' | 'inverse' | 'purple'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size preset. Defaults to 'md'. */
  size?: SpinnerSize
  /** Color tone. Defaults to 'primary'. */
  tone?: SpinnerTone
  /** Accessible label for screen readers. Defaults to 'Loading'. */
  label?: string
}

/**
 * Spinner — an animated loading indicator.
 */
export function Spinner({
  size = 'md',
  tone = 'primary',
  label = 'Loading',
  className,
  ...rest
}: SpinnerProps) {
  const sizes: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-9 w-9 border-[3px]',
  }

  const tones: Record<SpinnerTone, string> = {
    primary: 'border-grey-33 border-t-yellow',
    neutral: 'border-grey-2A border-t-grey-AA',
    inverse: 'border-white/30 border-t-white',
    purple: 'border-purple-tint border-t-purple',
  }

  return (
    <span role="status" aria-live="polite" className={cn('inline-flex', className)} {...rest}>
      <span
        className={cn(
          'inline-block animate-spin rounded-full',
          sizes[size],
          tones[tone]
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
