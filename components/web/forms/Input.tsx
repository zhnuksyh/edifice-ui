import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  /** Visible label text. */
  label?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Field id; auto-generated if omitted. */
  id?: string
}

/**
 * Input — labeled text field with error and helper-text support.
 */
export function Input({
  label,
  type = 'text',
  error,
  hint,
  id,
  required = false,
  className,
  ...rest
}: InputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <input
        id={fieldId}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          'h-10 w-full rounded-lg border bg-surface px-3 text-base text-text-primary placeholder:text-text-muted transition-colors duration-fast focus:outline-none focus-visible:ring-2',
          error
            ? 'border-danger focus-visible:ring-danger'
            : 'border-neutral-300 focus-visible:ring-primary-500',
          className
        )}
        {...rest}
      />
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${fieldId}-hint`} className="text-sm text-text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
