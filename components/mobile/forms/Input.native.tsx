import { View, Text, TextInput, type TextInputProps } from 'react-native'
import { cn } from '../../../utils/cn'

export interface InputProps extends TextInputProps {
  /** Visible label text. */
  label?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Mark the field required. */
  required?: boolean
  /** Extra NativeWind classes merged onto the input via cn(). */
  className?: string
}

/**
 * Input (native) — labeled text field for React Native + NativeWind.
 *
 * Mirrors the web Input props API.
 */
export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  required = false,
  className,
  ...rest
}: InputProps) {
  return (
    <View className="gap-1.5">
      {label && (
        <Text className="text-sm font-medium text-text-primary">
          {label}
          {required && <Text className="text-danger"> *</Text>}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        accessibilityLabel={label}
        className={cn(
          'h-11 w-full rounded-lg border bg-surface px-3 text-base text-text-primary',
          error ? 'border-danger' : 'border-neutral-300',
          className
        )}
        {...rest}
      />
      {error ? (
        <Text className="text-sm text-danger">{error}</Text>
      ) : (
        hint && <Text className="text-sm text-text-muted">{hint}</Text>
      )}
    </View>
  )
}
