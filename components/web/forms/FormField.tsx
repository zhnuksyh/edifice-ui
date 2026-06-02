import { useId, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface FormFieldProps {
  /** Visible label text. */
  label?: string
  /** Error message; takes precedence over hint and signals invalid. */
  error?: string
  /** Helper text shown below the control. */
  hint?: string
  /** Mark the field required (adds an asterisk to the label). */
  required?: boolean
  /** Field id; auto-generated if omitted. Passed to the render function. */
  id?: string
  /**
   * Render the control. Receives the resolved `id` and the `aria-describedby`
   * id to wire onto the input for accessible labeling/validation.
   */
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
  /** Extra classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * FormField — a consistent label + control + error/hint shell.
 *
 * Centralizes the field layout so every form control (Input, Select, Textarea,
 * custom controls) shares the same label, required marker, and error/hint
 * treatment. Pass the control via a render function so the field can wire `id`
 * and `aria-describedby` correctly.
 */
export function FormField({
  label,
  error,
  hint,
  required = false,
  id,
  children,
  className,
}: FormFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      {children({ id: fieldId, describedBy, invalid: Boolean(error) })}
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
