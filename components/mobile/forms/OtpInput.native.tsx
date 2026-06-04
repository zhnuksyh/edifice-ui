import { useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native'
import { cn } from '../../../utils/cn'

export interface OtpInputProps {
  /** Visible label text. */
  label?: string
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
  /** Extra NativeWind classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * OtpInput (native) — a segmented one-time-passcode / PIN entry.
 *
 * Mirrors the web OtpInput props API. Renders `length` single-character boxes
 * with auto-advance and backspace navigation. Multi-character input (autofill /
 * paste into the first box) is distributed across the boxes. Digits only.
 * Controlled via `value`/`onChange`, or uncontrolled via `defaultValue`.
 */
export function OtpInput({
  label,
  length = 6,
  value,
  defaultValue,
  onChange,
  onComplete,
  masked = false,
  disabled = false,
  error,
  hint,
  className,
}: OtpInputProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const code = (isControlled ? value : internal) ?? ''
  const inputs = useRef<(TextInput | null)[]>([])

  const chars = Array.from({ length }, (_, i) => code[i] ?? '')

  const setCode = (next: string) => {
    const trimmed = next.slice(0, length)
    if (!isControlled) setInternal(trimmed)
    onChange?.(trimmed)
    if (trimmed.length === length) onComplete?.(trimmed)
  }

  const focusBox = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index))
    inputs.current[clamped]?.focus()
  }

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (!digits) return

    // Multi-char (paste / autofill): fill from this box onward.
    if (digits.length > 1) {
      const arr = chars.slice()
      let pos = index
      for (const d of digits) {
        if (pos >= length) break
        arr[pos] = d
        pos++
      }
      setCode(arr.join('').slice(0, length))
      focusBox(pos)
      return
    }

    const arr = chars.slice()
    arr[index] = digits
    setCode(arr.join('').slice(0, length))
    focusBox(index + 1)
  }

  const handleKeyPress = (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (event.nativeEvent.key !== 'Backspace') return
    const arr = chars.slice()
    if (arr[index]) {
      arr[index] = ''
      setCode(arr.join(''))
    } else if (index > 0) {
      arr[index - 1] = ''
      setCode(arr.join(''))
      focusBox(index - 1)
    }
  }

  return (
    <View className={cn('gap-1.5', className)}>
      {label && (
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
      )}
      <View accessibilityRole="none" className="flex-row gap-2">
        {chars.map((char, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              inputs.current[index] = el
            }}
            value={char}
            editable={!disabled}
            keyboardType="number-pad"
            secureTextEntry={masked}
            maxLength={length}
            textContentType={index === 0 ? 'oneTimeCode' : 'none'}
            accessibilityLabel={`Digit ${index + 1}`}
            onChangeText={(t) => handleChange(index, t)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            className={cn(
              'h-12 w-10 rounded-lg border bg-surface text-center text-lg font-semibold text-text-primary',
              error ? 'border-danger' : 'border-grey-2A',
              disabled && 'opacity-50'
            )}
          />
        ))}
      </View>
      {error ? (
        <Text className="text-sm text-danger">{error}</Text>
      ) : (
        hint && <Text className="text-sm text-text-secondary">{hint}</Text>
      )}
    </View>
  )
}
