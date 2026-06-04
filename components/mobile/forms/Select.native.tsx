import { useState } from 'react'
import { Modal as RNModal, View, Text, Pressable, ScrollView } from 'react-native'
import { cn } from '../../../utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  /** Visible label text. */
  label?: string
  /** Options to render. */
  options: SelectOption[]
  /** Controlled selected value. */
  value?: string
  /** Default selected value (uncontrolled). */
  defaultValue?: string
  /** Called with the selected value when it changes. */
  onChange?: (value: string) => void
  /** Placeholder shown when nothing is selected. */
  placeholder?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Mark the field required. */
  required?: boolean
  /** Disable the control. */
  disabled?: boolean
  /** Extra NativeWind classes merged onto the trigger via cn(). */
  className?: string
}

/**
 * Select (native) — labeled dropdown with a themed popup listbox.
 *
 * Mirrors the web Select props API. The popup is an RN `Modal` (touch has no
 * keyboard navigation). Closes on selection and backdrop press. Controlled via
 * `value`/`onChange`, or uncontrolled via `defaultValue`.
 */
export function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  error,
  hint,
  required = false,
  disabled = false,
  className,
}: SelectProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const selected = isControlled ? value : internal

  const [open, setOpen] = useState(false)
  const selectedOption = options.find((o) => o.value === selected)

  const commit = (next: string) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
    setOpen(false)
  }

  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-sm font-medium text-text-primary">
          {label}
          {required && <Text className="text-danger"> *</Text>}
        </Text>
      )}

      <Pressable
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: open, disabled }}
        accessibilityLabel={label}
        className={cn(
          'h-11 w-full flex-row items-center justify-between gap-2 rounded-lg border bg-surface px-3',
          error ? 'border-danger' : 'border-grey-2A',
          disabled && 'opacity-50',
          className
        )}
      >
        <Text
          className={cn(
            'flex-1 text-base',
            selectedOption ? 'text-text-primary' : 'text-text-secondary'
          )}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Text className="text-text-secondary">▾</Text>
      </Pressable>

      <RNModal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          onPress={() => setOpen(false)}
          accessibilityLabel="Close"
          className="flex-1 items-center justify-center bg-overlay p-6"
        >
          <Pressable
            accessibilityRole="menu"
            onPress={() => {}}
            className="max-h-80 w-full max-w-sm rounded-lg border border-grey-2A bg-grey-1A p-1"
          >
            <ScrollView>
              {options.map((opt) => {
                const isSelected = opt.value === selected
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => !opt.disabled && commit(opt.value)}
                    disabled={opt.disabled}
                    accessibilityRole="menuitem"
                    accessibilityState={{ selected: isSelected, disabled: opt.disabled }}
                    className={cn(
                      'flex-row items-center justify-between rounded-md px-3 py-2.5',
                      opt.disabled && 'opacity-50',
                      !opt.disabled && 'active:bg-grey-2A'
                    )}
                  >
                    <Text
                      className={cn(
                        'flex-1 text-sm',
                        isSelected ? 'text-yellow' : 'text-text-secondary'
                      )}
                      numberOfLines={1}
                    >
                      {opt.label}
                    </Text>
                    {isSelected && <Text className="ml-2 text-yellow">✓</Text>}
                  </Pressable>
                )
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </RNModal>

      {error ? (
        <Text className="text-sm text-danger">{error}</Text>
      ) : (
        hint && <Text className="text-sm text-text-secondary">{hint}</Text>
      )}
    </View>
  )
}
