import { View, Text, TextInput } from 'react-native'
import { cn } from '../../../utils/cn.js'

/**
 * Input (native) — labeled text field for React Native + NativeWind.
 *
 * Mirrors the web Input props API.
 *
 * @param {Object} props
 * @param {string} [props.label] - Visible label text.
 * @param {string} [props.value] - Controlled value.
 * @param {(text: string) => void} [props.onChangeText] - Change handler.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.error] - Error message; sets invalid styling.
 * @param {string} [props.hint] - Helper text shown below the field.
 * @param {boolean} [props.required=false] - Mark the field required.
 * @param {string} [props.className] - Extra NativeWind classes merged onto the
 *   input via cn().
 * @returns {JSX.Element}
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
}) {
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
