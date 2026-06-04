import { View, Text, Pressable } from 'react-native'
import { cn } from '../../../utils/cn'

export interface CheckboxProps {
  /** Visible label beside the box. */
  label?: string
  /** Checked state. */
  checked?: boolean
  /** Called with the next checked state when pressed. */
  onChange?: (checked: boolean) => void
  /** Indeterminate (mixed) visual state. */
  indeterminate?: boolean
  /** Error message shown below the control. */
  error?: string
  /** Disable the control. */
  disabled?: boolean
  /** Extra NativeWind classes merged onto the box via cn(). */
  className?: string
}

/**
 * Checkbox (native) — a labeled boolean control with indeterminate support.
 *
 * Mirrors the web Checkbox props API. RN has no native checkbox, so the box is
 * a styled Pressable with a ✓ (or – when indeterminate) glyph. Controlled via
 * `checked`/`onChange`.
 */
export function Checkbox({
  label,
  checked = false,
  onChange,
  indeterminate = false,
  error,
  disabled = false,
  className,
}: CheckboxProps) {
  const active = checked || indeterminate

  return (
    <View className="gap-1.5">
      <Pressable
        onPress={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: indeterminate ? 'mixed' : checked,
          disabled,
        }}
        accessibilityLabel={label}
        className={cn(
          'flex-row items-center gap-2.5',
          disabled && 'opacity-50'
        )}
      >
        <View
          className={cn(
            'h-5 w-5 items-center justify-center rounded border bg-surface',
            active
              ? 'border-yellow bg-yellow'
              : error
                ? 'border-danger'
                : 'border-grey-2A',
            className
          )}
        >
          {active && (
            <Text className="text-xs font-bold text-grey-0A">
              {indeterminate ? '–' : '✓'}
            </Text>
          )}
        </View>
        {label && <Text className="text-sm text-text-primary">{label}</Text>}
      </Pressable>
      {error && <Text className="text-sm text-danger">{error}</Text>}
    </View>
  )
}
