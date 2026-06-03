import { View, Text, Switch, type SwitchProps } from 'react-native'
import { cn } from '../../../utils/cn'

export interface ToggleProps
  extends Omit<SwitchProps, 'value' | 'onValueChange' | 'onChange'> {
  /** Current on/off state. */
  checked: boolean
  /** Called with the next state. */
  onChange: (checked: boolean) => void
  /** Optional label shown beside the switch. */
  label?: string
  /** Disable the control. */
  disabled?: boolean
  /** Extra NativeWind classes merged onto the wrapper via cn(). */
  className?: string
}

/**
 * Toggle (native) — accessible on/off switch for React Native + NativeWind.
 *
 * Mirrors the web Toggle props API (`checked`/`onChange`/`label`), wrapping the
 * platform `Switch`. Controlled component.
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  ...rest
}: ToggleProps) {
  return (
    <View
      className={cn(
        'flex-row items-center gap-3',
        disabled && 'opacity-50',
        className
      )}
    >
      <Switch
        value={checked}
        onValueChange={onChange}
        disabled={disabled}
        accessibilityRole="switch"
        accessibilityState={{ checked, disabled }}
        {...rest}
      />
      {label && (
        <Text className="text-sm font-medium text-text-primary">{label}</Text>
      )}
    </View>
  )
}
