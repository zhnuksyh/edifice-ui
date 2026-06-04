import { useId, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface ToggleProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'id' | 'onChange' | 'type'
  > {
  /** Current on/off state. */
  checked: boolean
  /** Called with the next state. */
  onChange: (checked: boolean) => void
  /** Optional label shown beside the switch. */
  label?: string
  /** Control id; auto-generated if omitted. */
  id?: string
}

/**
 * Toggle — accessible on/off switch.
 *
 * Controlled component: pass `checked` and `onChange`.
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  id,
  className,
  ...rest
}: ToggleProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <label
      htmlFor={fieldId}
      className={cn(
        'inline-flex items-center gap-3',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className
      )}
    >
      <button
        id={fieldId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11',
          checked ? 'border-primary-600 bg-primary-600' : 'border-grey-2A bg-grey-22'
        )}
        {...rest}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-grey-F0 shadow-sm transition-transform duration-fast',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
    </label>
  )
}
