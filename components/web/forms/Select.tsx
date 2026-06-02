import { useId, type SelectHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  /** Visible label text. */
  label?: string
  /** Options to render. */
  options: SelectOption[]
  /** Optional disabled first option. */
  placeholder?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Field id; auto-generated if omitted. */
  id?: string
}

/**
 * Select — labeled dropdown with error and helper-text support.
 */
export function Select({
  label,
  options = [],
  placeholder,
  error,
  hint,
  id,
  required = false,
  className,
  ...rest
}: SelectProps) {
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
      <select
        id={fieldId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          'h-10 w-full rounded-lg border bg-surface px-3 text-base text-text-primary transition-colors duration-fast focus:outline-none focus-visible:ring-2',
          error
            ? 'border-danger focus-visible:ring-danger'
            : 'border-neutral-300 focus-visible:ring-primary-500',
          className
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
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
