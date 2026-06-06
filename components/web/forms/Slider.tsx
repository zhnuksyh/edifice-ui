import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface SliderProps {
  /** Visible label text. */
  label?: string
  /** Controlled value. */
  value?: number
  /** Default value (uncontrolled). */
  defaultValue?: number
  /** Called with the new value as the user drags. */
  onChange?: (value: number) => void
  /** Minimum. Defaults to 0. */
  min?: number
  /** Maximum. Defaults to 100. */
  max?: number
  /** Step increment. Defaults to 1. */
  step?: number
  /** Disable the control. */
  disabled?: boolean
  /** Show the current value beside the label. Defaults to true. */
  showValue?: boolean
  /** Format the displayed value (e.g. (v) => `${v}%`). */
  formatValue?: (value: number) => ReactNode
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Field id; auto-generated if omitted. */
  id?: string
  /** Name for native form submission. */
  name?: string
  /** Extra classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * Slider — a labeled range input with a value readout.
 *
 * Wraps a native `<input type="range">` for full keyboard and a11y support; the
 * filled track and thumb are themed via `accent-color`. Controlled via
 * `value`/`onChange`, or uncontrolled via `defaultValue`.
 */
export function Slider({
  label,
  value,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = true,
  formatValue,
  error,
  hint,
  id,
  name,
  className,
}: SliderProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? min)
  const current = isControlled ? value : internal

  const commit = (next: number) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-sm tabular-nums text-text-secondary">
              {formatValue ? formatValue(current) : current}
            </span>
          )}
        </div>
      )}
      <input
        id={fieldId}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        onChange={(e) => commit(Number(e.target.value))}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-grey-2A accent-yellow focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'accent-danger'
        )}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${fieldId}-hint`} className="text-sm text-text-secondary">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
