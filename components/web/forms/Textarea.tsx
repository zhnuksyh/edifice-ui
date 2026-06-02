import { type TextareaHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'
import { FormField } from './FormField'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
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
 * Textarea — labeled multi-line text field with error and helper-text support.
 *
 * Mirrors Input's props API for consistency.
 */
export function Textarea({
  label,
  error,
  hint,
  id,
  required = false,
  rows = 4,
  className,
  ...rest
}: TextareaProps) {
  return (
    <FormField label={label} error={error} hint={hint} required={required} id={id}>
      {({ id: fieldId, describedBy, invalid }) => (
        <textarea
          id={fieldId}
          rows={rows}
          required={required}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          className={cn(
            'w-full rounded-lg border bg-surface px-3 py-2 text-base text-text-primary placeholder:text-text-secondary transition-colors duration-fast focus:outline-none focus-visible:ring-2',
            invalid
              ? 'border-danger focus-visible:ring-danger'
              : 'border-grey-2A hover:border-grey-44 focus-visible:ring-primary-500',
            className
          )}
          {...rest}
        />
      )}
    </FormField>
  )
}
