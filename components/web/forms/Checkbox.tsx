import { useEffect, useId, useRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  /** Visible label beside the box. */
  label?: string
  /** Indeterminate (mixed) visual state. */
  indeterminate?: boolean
  /** Error message shown below the control. */
  error?: string
  /** Field id; auto-generated if omitted. */
  id?: string
}

/**
 * Checkbox — a labeled boolean control with indeterminate support.
 *
 * Wraps a native checkbox for accessibility; the visible box is styled and the
 * native input is visually hidden but still focusable.
 */
export function Checkbox({
  label,
  indeterminate = false,
  error,
  id,
  checked,
  disabled = false,
  className,
  ...rest
}: CheckboxProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className={cn(
          'inline-flex items-center gap-2.5',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        )}
      >
        <span className="relative inline-flex">
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className="peer sr-only"
            {...rest}
          />
          <span
            aria-hidden="true"
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded border bg-surface text-text-inverse transition-colors duration-fast',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2',
              error ? 'border-danger' : 'border-grey-2A',
              'peer-checked:border-primary-600 peer-checked:bg-primary-600',
              'peer-indeterminate:border-primary-600 peer-indeterminate:bg-primary-600',
              className
            )}
          >
            {indeterminate ? (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 opacity-0 peer-checked:opacity-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </span>
        </span>
        {label && (
          <span className="text-sm text-text-primary">{label}</span>
        )}
      </label>
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  )
}
