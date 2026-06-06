import { useId, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react'
import { cn } from '../../../utils/cn'

export type OtpInputStyleVariant = 'outline' | 'filled' | 'underline'

export interface OtpInputProps {
  /** Visible label text. */
  label?: string
  /**
   * Surface treatment for each box. Defaults to 'outline'.
   * - `outline` — surface fill with a full hairline border (the original).
   * - `filled` — brighter fill, borderless until focus.
   * - `underline` — transparent, bottom border only (classic digit slots).
   */
  styleVariant?: OtpInputStyleVariant
  /** Number of digits. Defaults to 6. */
  length?: number
  /** Controlled value (the joined code). */
  value?: string
  /** Default value (uncontrolled). */
  defaultValue?: string
  /** Called with the code as it changes. */
  onChange?: (value: string) => void
  /** Called once when every box is filled. */
  onComplete?: (value: string) => void
  /** Mask input as password dots. */
  masked?: boolean
  /** Disable the control. */
  disabled?: boolean
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Field id prefix; auto-generated if omitted. */
  id?: string
  /** Extra classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * OtpInput — a segmented one-time-passcode / PIN entry.
 *
 * Renders `length` single-character boxes with auto-advance, backspace
 * navigation, arrow keys, and paste-to-fill. Accepts digits only. Controlled
 * via `value`/`onChange`, or uncontrolled via `defaultValue`.
 */
export function OtpInput({
  label,
  styleVariant = 'outline',
  length = 6,
  value,
  defaultValue,
  onChange,
  onComplete,
  masked = false,
  disabled = false,
  error,
  hint,
  id,
  className,
}: OtpInputProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const code = (isControlled ? value : internal) ?? ''
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const chars = Array.from({ length }, (_, i) => code[i] ?? '')

  // Per-treatment box surface; `normal`/`invalid` carry the border colors.
  const boxTreatments: Record<
    OtpInputStyleVariant,
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

  const boxTreatment = boxTreatments[styleVariant]

  const setCode = (next: string) => {
    const trimmed = next.slice(0, length)
    if (!isControlled) setInternal(trimmed)
    onChange?.(trimmed)
    if (trimmed.length === length) onComplete?.(trimmed)
  }

  const focusBox = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index))
    inputs.current[clamped]?.focus()
    inputs.current[clamped]?.select()
  }

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    if (!digit) return
    const arr = chars.slice()
    arr[index] = digit
    setCode(arr.join('').slice(0, length))
    focusBox(index + 1)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      const arr = chars.slice()
      if (arr[index]) {
        arr[index] = ''
        setCode(arr.join(''))
      } else {
        arr[index - 1] = ''
        setCode(arr.join(''))
        focusBox(index - 1)
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusBox(index - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusBox(index + 1)
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return
    setCode(pasted.slice(0, length))
    focusBox(pasted.length)
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span id={`${fieldId}-label`} className="text-sm font-medium text-text-primary">
          {label}
        </span>
      )}
      <div
        className="flex gap-2"
        role="group"
        aria-labelledby={label ? `${fieldId}-label` : undefined}
        aria-describedby={describedBy}
      >
        {chars.map((char, index) => (
          <input
            key={index}
            ref={(el) => {
              inputs.current[index] = el
            }}
            type={masked ? 'password' : 'text'}
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={char}
            disabled={disabled}
            aria-label={`Digit ${index + 1}`}
            aria-invalid={Boolean(error)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={cn(
              'h-12 w-10 text-center text-lg font-semibold text-text-primary transition-colors duration-fast focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              boxTreatment.surface,
              error ? boxTreatment.invalid : boxTreatment.normal
            )}
          />
        ))}
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
