import { View, Text, TextInput, type TextInputProps } from 'react-native'
import { cn } from '../../../utils/cn'

export interface TextareaProps extends TextInputProps {
  /** Visible label text. */
  label?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Mark the field required. */
  required?: boolean
  /** Number of visible text lines. Defaults to 4. */
  rows?: number
  /** Extra NativeWind classes merged onto the input via cn(). */
  className?: string
}

/**
 * Textarea (native) — labeled multi-line text field for React Native.
 *
 * Mirrors the web Textarea props API, wrapping a multiline `TextInput`.
 */
export function Textarea({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  required = false,
  rows = 4,
  className,
  ...rest
}: TextareaProps) {
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
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        className={cn(
          'w-full rounded-lg border bg-surface px-3 py-2 text-base text-text-primary',
          error ? 'border-danger' : 'border-grey-2A',
          className
        )}
        style={{ minHeight: rows * 24 }}
        {...rest}
      />
      {error ? (
        <Text className="text-sm text-danger">{error}</Text>
      ) : (
        hint && <Text className="text-sm text-text-secondary">{hint}</Text>
      )}
    </View>
  )
}
