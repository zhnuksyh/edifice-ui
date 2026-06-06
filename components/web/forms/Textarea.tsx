import { type TextareaHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'
import { FormField } from './FormField'

export type TextareaStyleVariant = 'outline' | 'filled' | 'underline'

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  /** Visible label text. */
  label?: string
  /**
   * Surface treatment. Defaults to 'outline'.
   * - `outline` — surface fill with a full hairline border (the original).
   * - `filled` — brighter fill, borderless until focus.
   * - `underline` — transparent, bottom border only.
   */
  styleVariant?: TextareaStyleVariant
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
  styleVariant = 'outline',
  error,
  hint,
  id,
  required = false,
  rows = 4,
  className,
  ...rest
}: TextareaProps) {
  // Per-treatment surface; `normal`/`invalid` carry the border colors.
  const treatments: Record<
    TextareaStyleVariant,
    { surface: string; normal: string; invalid: string }
  > = {
    outline: {
      surface: 'rounded-lg border bg-surface focus-visible:ring-2',
      normal: 'border-grey-2A hover:border-grey-44 focus-visible:ring-yellow',
      invalid: 'border-danger focus-visible:ring-danger',
    },
    filled: {
      surface: 'rounded-lg border border-transparent bg-grey-22 focus-visible:ring-2',
      normal: 'hover:bg-grey-2A focus-visible:ring-yellow',
      invalid: 'border-danger focus-visible:ring-danger',
    },
    underline: {
      surface: 'rounded-none border-0 border-b-2 bg-transparent',
      normal: 'border-grey-2A hover:border-grey-44 focus-visible:border-yellow',
      invalid: 'border-danger focus-visible:border-danger',
    },
  }

  const treatment = treatments[styleVariant]

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
            'w-full px-3 py-2 text-base text-text-primary placeholder:text-text-secondary transition-colors duration-fast focus:outline-none',
            treatment.surface,
            invalid ? treatment.invalid : treatment.normal,
            className
          )}
          {...rest}
        />
      )}
    </FormField>
  )
}
