import { createContext, useContext, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface RadioGroupContextValue {
  name: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps {
  /** Shared name for the radio inputs; auto-generated if omitted. */
  name?: string
  /** Visible group label. */
  label?: string
  /** Controlled selected value. */
  value?: string
  /** Called with the newly-selected value. */
  onChange?: (value: string) => void
  /** Error message shown below the group. */
  error?: string
  /** Helper text shown below the group. */
  hint?: string
  /** Disable all radios in the group. */
  disabled?: boolean
  /** Radio children. */
  children: ReactNode
  /** Extra classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * RadioGroup — groups Radio controls into a single mutually-exclusive choice.
 *
 * Provides the shared name + selected value to child Radios via context.
 * Controlled via `value`/`onChange`.
 */
export function RadioGroup({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  children,
  className,
}: RadioGroupProps) {
  const generatedName = useId()
  const groupName = name ?? generatedName

  return (
    <div
      role="radiogroup"
      aria-label={label}
      aria-invalid={Boolean(error)}
      className={cn('flex flex-col gap-2', className)}
    >
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
      <RadioGroupContext.Provider value={{ name: groupName, value, onChange, disabled }}>
        <div className="flex flex-col gap-2">{children}</div>
      </RadioGroupContext.Provider>
      {error ? (
        <p className="text-sm text-danger">{error}</p>
      ) : (
        hint && <p className="text-sm text-text-secondary">{hint}</p>
      )}
    </div>
  )
}

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'type' | 'value' | 'onChange'> {
  /** The value this radio represents. */
  value: string
  /** Visible label beside the radio. */
  label?: string
  /** Field id; auto-generated if omitted. */
  id?: string
}

/**
 * Radio — a single option within a RadioGroup.
 */
export function Radio({ value, label, id, disabled, className, ...rest }: RadioProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const group = useContext(RadioGroupContext)

  const isDisabled = disabled || group?.disabled
  const checked = group ? group.value === value : undefined

  return (
    <label
      htmlFor={fieldId}
      className={cn(
        'inline-flex items-center gap-2.5',
        isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      )}
    >
      <span className="relative inline-flex">
        <input
          id={fieldId}
          type="radio"
          name={group?.name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={() => group?.onChange?.(value)}
          className="peer sr-only"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-full border bg-surface transition-colors duration-fast',
            'border-grey-2A peer-checked:border-yellow',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-yellow peer-focus-visible:ring-offset-2',
            className
          )}
        >
          <span className="h-2 w-2 rounded-full bg-yellow opacity-0 transition-opacity duration-fast peer-checked:opacity-100" />
        </span>
      </span>
      {label && <span className="text-sm text-text-primary">{label}</span>}
    </label>
  )
}
