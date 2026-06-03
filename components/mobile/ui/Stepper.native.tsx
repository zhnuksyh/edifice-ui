import { View, Text, type ViewProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type StepperOrientation = 'horizontal' | 'vertical'

export interface Step {
  /** Stable key. */
  id: string
  /** Step label. String or nodes. */
  label: ReactNode
  /** Optional supporting description below the label. String or nodes. */
  description?: ReactNode
}

export interface StepperProps extends ViewProps {
  /** Ordered steps. */
  steps: Step[]
  /** Zero-based index of the active step. Steps before it render as complete. */
  current: number
  /** Layout direction. Defaults to 'horizontal'. */
  orientation?: StepperOrientation
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Stepper (native) — a numbered progress indicator for multi-step flows.
 *
 * Mirrors the web Stepper props API. Steps before `current` show complete (a ✓
 * glyph), the `current` step is highlighted, later steps are upcoming. Purely
 * presentational — the consumer drives `current`. String label/description are
 * wrapped in styled <Text>.
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
    <View
      accessibilityRole="none"
      className={cn(isVertical ? 'flex-col' : 'flex-row items-start', className)}
      {...rest}
    >
      {steps.map((step, index) => {
        const isComplete = index < current
        const isActive = index === current
        const isLast = index === steps.length - 1

        return (
          <View
            key={step.id}
            className={cn(
              'flex-row',
              isVertical ? 'gap-3 pb-6' : 'flex-1',
              isVertical && isLast && 'pb-0',
              !isVertical && isLast && 'flex-none'
            )}
          >
            <View className={cn(isVertical ? 'flex-col items-center' : 'flex-row items-center w-full')}>
              <View
                className={cn(
                  'h-8 w-8 items-center justify-center rounded-full border-2',
                  isComplete && 'border-yellow bg-yellow',
                  isActive && 'border-yellow bg-grey-1A',
                  !isComplete && !isActive && 'border-grey-2A bg-grey-1A'
                )}
              >
                <Text
                  className={cn(
                    'text-sm font-semibold',
                    isComplete && 'text-grey-0A',
                    isActive && 'text-yellow',
                    !isComplete && !isActive && 'text-text-muted'
                  )}
                >
                  {isComplete ? '✓' : index + 1}
                </Text>
              </View>
              {!isLast && (
                <View
                  className={cn(
                    isVertical ? 'my-1 w-px flex-1' : 'mx-3 h-px flex-1',
                    isComplete ? 'bg-yellow' : 'bg-grey-2A'
                  )}
                />
              )}
            </View>
            <View className={cn(isVertical ? 'pt-1' : 'mt-2')}>
              {typeof step.label === 'string' ? (
                <Text
                  className={cn(
                    'text-sm font-medium',
                    isActive || isComplete ? 'text-text-primary' : 'text-text-muted'
                  )}
                >
                  {step.label}
                </Text>
              ) : (
                step.label
              )}
              {step.description != null &&
                (typeof step.description === 'string' ? (
                  <Text className="mt-0.5 text-xs text-text-secondary">
                    {step.description}
                  </Text>
                ) : (
                  step.description
                ))}
            </View>
          </View>
        )
      })}
    </View>
  )
}
