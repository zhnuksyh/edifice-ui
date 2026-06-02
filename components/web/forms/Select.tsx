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
      <div className="relative">
        <select
          id={fieldId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            // Remove the native chrome (we draw our own chevron); `color-scheme:dark`
            // makes the native option popup render dark to match the theme.
            'h-10 w-full appearance-none rounded-lg border bg-surface px-3 pr-9 text-base text-text-primary transition-colors duration-fast [color-scheme:dark] focus:outline-none focus-visible:ring-2',
            error
              ? 'border-danger focus-visible:ring-danger'
              : 'border-grey-2A focus-visible:ring-primary-500',
            className
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled className="bg-grey-1A text-text-primary">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-grey-1A text-text-primary"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
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
