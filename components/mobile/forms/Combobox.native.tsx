import { useMemo, useState } from 'react'
import {
  Modal as RNModal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native'
import { cn } from '../../../utils/cn'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  /** Visible label text. */
  label?: string
  /** Options to filter and choose from. */
  options: ComboboxOption[]
  /** Controlled selected value. */
  value?: string
  /** Default selected value (uncontrolled). */
  defaultValue?: string
  /** Called with the selected value when it changes. */
  onChange?: (value: string) => void
  /** Placeholder for the search input. */
  placeholder?: string
  /** Message when no option matches the query. Defaults to 'No results'. */
  emptyMessage?: string
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
 * Combobox (native) — a searchable select: type to filter options, then pick one.
 *
 * Mirrors the web Combobox props API. The picker is an RN `Modal` with a search
 * field at the top (touch has no keyboard arrow-nav). Closes on selection and
 * backdrop press. Controlled via `value`/`onChange`, or uncontrolled via
 * `defaultValue`. For a non-filterable picker use Select.
 */
export function Combobox({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Search…',
  emptyMessage = 'No results',
  error,
  hint,
  required = false,
  disabled = false,
  className,
}: ComboboxProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const selected = isControlled ? value : internal
  const selectedOption = options.find((o) => o.value === selected)

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  const close = () => {
    setOpen(false)
    setQuery('')
  }

  const commit = (option: ComboboxOption) => {
    if (option.disabled) return
    if (!isControlled) setInternal(option.value)
    onChange?.(option.value)
    close()
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
        onRequestClose={close}
      >
        <Pressable
          onPress={close}
          accessibilityLabel="Close"
          className="flex-1 items-center justify-center bg-overlay p-6"
        >
          <Pressable
            accessibilityRole="none"
            onPress={() => {}}
            className="max-h-96 w-full max-w-sm rounded-lg border border-grey-2A bg-grey-1A p-2"
          >
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder={placeholder}
              autoFocus
              accessibilityLabel={label}
              className="mb-2 h-10 rounded-md border border-grey-2A bg-surface px-3 text-base text-text-primary"
            />
            <ScrollView keyboardShouldPersistTaps="handled">
              {filtered.length === 0 ? (
                <Text className="px-3 py-2 text-sm text-text-secondary">
                  {emptyMessage}
                </Text>
              ) : (
                filtered.map((opt) => {
                  const isSelected = opt.value === selected
                  return (
                    <Pressable
                      key={opt.value}
                      onPress={() => commit(opt)}
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
                })
              )}
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
