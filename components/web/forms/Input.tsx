import { useId, type InputHTMLAttributes, type ReactNode } from 'react'
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
  /** Icon rendered inside the field, leading. */
  leftIcon?: ReactNode
  /** Icon rendered inside the field, trailing (hidden when `clearable` shows). */
  rightIcon?: ReactNode
  /** Show a clear (×) button when there is a value; called when clicked. */
  clearable?: boolean
  /** Called when the clear button is clicked. */
  onClear?: () => void
}

/**
 * Input — labeled text field with error, helper-text, icon, and clear support.
 */
export function Input({
  label,
  type = 'text',
  error,
  hint,
  id,
  required = false,
  leftIcon,
  rightIcon,
  clearable = false,
  onClear,
  value,
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

  const showClear = clearable && value !== undefined && value !== ''
  const hasRight = showClear || Boolean(rightIcon)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-text-secondary">
            {leftIcon}
          </span>
        )}
        <input
          id={fieldId}
          type={type}
          required={required}
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={cn(
            'h-11 w-full rounded-lg border bg-grey-1A px-3 text-base text-text-primary placeholder:text-text-muted transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11',
            leftIcon && 'pl-9',
            hasRight && 'pr-9',
            error
              ? 'border-danger focus-visible:ring-danger'
              : 'border-grey-2A hover:border-grey-44 focus-visible:ring-primary-500',
            className
          )}
          {...rest}
        />
        {showClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear"
            className="absolute right-2.5 top-1/2 flex -translate-y-1/2 text-text-secondary transition-colors duration-fast hover:text-text-primary"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        ) : (
          rightIcon && (
            <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 text-text-secondary">
              {rightIcon}
            </span>
          )
        )}
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
