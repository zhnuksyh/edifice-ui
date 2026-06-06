import { useState, type HTMLAttributes } from 'react'
import { Star } from 'lucide-react'
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
              strokeWidth={2}
              aria-hidden="true"
              className={cn(
                sizes[size],
                filled ? 'fill-current text-yellow' : 'text-grey-2A'
              )}
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
            className="rounded transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11"
          >
            <Star
              strokeWidth={2}
              aria-hidden="true"
              className={cn(
                sizes[size],
                filled
                  ? 'fill-current text-yellow'
                  : 'text-grey-2A hover:text-grey-44'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
