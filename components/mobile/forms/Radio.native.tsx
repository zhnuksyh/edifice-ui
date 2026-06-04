import { createContext, useContext, type ReactNode } from 'react'
import { View, Text, Pressable } from 'react-native'
import { cn } from '../../../utils/cn'

interface RadioGroupContextValue {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps {
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
  /** Extra NativeWind classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * RadioGroup (native) — groups Radio controls into one mutually-exclusive choice.
 *
 * Mirrors the web RadioGroup props API, providing the selected value to child
 * Radios via context. Controlled via `value`/`onChange`.
 */
export function RadioGroup({
  label,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  children,
  className,
}: RadioGroupProps) {
  return (
    <View accessibilityRole="radiogroup" className={cn('gap-2', className)}>
      {label && (
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
      )}
      <RadioGroupContext.Provider value={{ value, onChange, disabled }}>
        <View className="gap-2">{children}</View>
      </RadioGroupContext.Provider>
      {error ? (
        <Text className="text-sm text-danger">{error}</Text>
      ) : (
        hint && <Text className="text-sm text-text-secondary">{hint}</Text>
      )}
    </View>
  )
}

export interface RadioProps {
  /** The value this radio represents. */
  value: string
  /** Visible label beside the radio. */
  label?: string
  /** Disable this radio. */
  disabled?: boolean
  /** Extra NativeWind classes merged onto the dot wrapper via cn(). */
  className?: string
}

/**
 * Radio (native) — a single option within a RadioGroup.
 *
 * Mirrors the web Radio props API.
 */
export function Radio({ value, label, disabled, className }: RadioProps) {
  const group = useContext(RadioGroupContext)
  const isDisabled = disabled || group?.disabled
  const checked = group ? group.value === value : false

  return (
    <Pressable
      onPress={() => !isDisabled && group?.onChange?.(value)}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ checked, disabled: isDisabled }}
      accessibilityLabel={label}
      className={cn('flex-row items-center gap-2.5', isDisabled && 'opacity-50')}
    >
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded-full border bg-surface',
          checked ? 'border-yellow' : 'border-grey-2A',
          className
        )}
      >
        {checked && <View className="h-2 w-2 rounded-full bg-yellow" />}
      </View>
      {label && <Text className="text-sm text-text-primary">{label}</Text>}
    </Pressable>
  )
}
