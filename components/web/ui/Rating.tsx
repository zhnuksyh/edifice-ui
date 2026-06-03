import { useState, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export type RatingSize = 'sm' | 'md' | 'lg'

export interface RatingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating (number of filled stars). */
  value: number
  /** Called with the new value when a star is clicked. Omit for read-only. */
  onChange?: (value: number) => void
  /** Total number of stars. Defaults to 5. */
  max?: number
  /** Star size. Defaults to 'md'. */
  size?: RatingSize
  /** Disable interaction (display only). Inferred when `onChange` is omitted. */
  readOnly?: boolean
}

/** Single star glyph; `filled` toggles the fill. */
function Star({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/**
 * Rating — a star rating control, interactive or read-only.
 *
 * Provide `onChange` to make it interactive (click and hover-preview); omit it
 * (or set `readOnly`) to display a static rating. The consumer owns `value`.
 */
export function Rating({
  value,
  onChange,
  max = 5,
  size = 'md',
  readOnly,
  className,
  ...rest
}: RatingProps) {
  const [hover, setHover] = useState<number | null>(null)
  const interactive = !readOnly && Boolean(onChange)

  const sizes: Record<RatingSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
  }

  const display = hover ?? value

  return (
    <div
      className={cn('inline-flex items-center gap-0.5', className)}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? undefined : `Rated ${value} out of ${max}`}
      onMouseLeave={() => setHover(null)}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= display

        if (!interactive) {
          return (
            <Star
              key={starValue}
              filled={filled}
              className={cn(sizes[size], filled ? 'text-yellow' : 'text-grey-2A')}
            />
          )
        }

        return (
          <button
            key={starValue}
            type="button"
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => setHover(starValue)}
            aria-label={`${starValue} star${starValue === 1 ? '' : 's'}`}
            aria-checked={starValue === value}
            role="radio"
            className="rounded transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11"
          >
            <Star
              filled={filled}
              className={cn(
                sizes[size],
                filled ? 'text-yellow' : 'text-grey-2A hover:text-grey-44'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
