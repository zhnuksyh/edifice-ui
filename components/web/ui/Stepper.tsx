import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type StepperOrientation = 'horizontal' | 'vertical'

export interface Step {
  /** Stable key. */
  id: string
  /** Step label. */
  label: ReactNode
  /** Optional supporting description below the label. */
  description?: ReactNode
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  /** Ordered steps. */
  steps: Step[]
  /** Zero-based index of the active step. Steps before it render as complete. */
  current: number
  /** Layout direction. Defaults to 'horizontal'. */
  orientation?: StepperOrientation
}

/**
 * Stepper — a numbered progress indicator for multi-step flows.
 *
 * Steps before `current` show as complete (check), the `current` step is
 * highlighted, and later steps are upcoming. Purely presentational — the
 * consumer drives `current`.
 */
export function Stepper({
  steps,
  current,
  orientation = 'horizontal',
  className,
  ...rest
}: StepperProps) {
  if (steps.length === 0) return null

  const isVertical = orientation === 'vertical'

  return (
    <ol
      className={cn(
        isVertical ? 'flex flex-col' : 'flex items-start',
        className
      )}
      {...rest}
    >
      {steps.map((step, index) => {
        const isComplete = index < current
        const isActive = index === current
        const isLast = index === steps.length - 1

        return (
          <li
            key={step.id}
            className={cn(
              'flex',
              isVertical ? 'gap-3 pb-6 last:pb-0' : 'flex-1 last:flex-none'
            )}
          >
            <div
              className={cn('flex', isVertical ? 'flex-col items-center' : 'items-center w-full')}
            >
              <span
                className={cn(
                  'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                  isComplete && 'border-yellow bg-yellow text-grey-0A',
                  isActive && 'border-yellow bg-grey-1A text-yellow',
                  !isComplete && !isActive && 'border-grey-2A bg-grey-1A text-text-muted'
                )}
              >
                {isComplete ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    isVertical ? 'my-1 w-px flex-1' : 'mx-3 h-px flex-1',
                    isComplete ? 'bg-yellow' : 'bg-grey-2A'
                  )}
                  aria-hidden
                />
              )}
            </div>
            <div className={cn(isVertical ? 'pt-1' : 'mt-2', isLast && !isVertical && 'mt-2')}>
              <p
                className={cn(
                  'text-sm font-medium',
                  isActive || isComplete ? 'text-text-primary' : 'text-text-muted'
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-text-secondary">{step.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
