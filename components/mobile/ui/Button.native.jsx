import { Pressable, Text } from 'react-native'
import { cn } from '../../../utils/cn.js'

/**
 * Button (native) — primary interactive control for React Native + NativeWind.
 *
 * Mirrors the web Button props API.
 *
 * @param {Object} props
 * @param {('primary'|'secondary'|'accent'|'ghost'|'danger')} [props.variant='primary']
 *   Visual style.
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size preset.
 * @param {boolean} [props.fullWidth=false] - Stretch to container width.
 * @param {boolean} [props.disabled=false] - Disable interaction.
 * @param {() => void} [props.onPress] - Press handler.
 * @param {import('react').ReactNode} props.children - Button label/content.
 * @param {string} [props.className] - Extra NativeWind classes merged via cn().
 * @returns {JSX.Element}
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onPress,
  children,
  className,
  ...rest
}) {
  const base = 'flex-row items-center justify-center rounded-lg'

  const variants = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-600 active:bg-secondary-700',
    accent: 'bg-accent-500 active:bg-accent-600',
    ghost: 'bg-transparent active:bg-neutral-100',
    danger: 'bg-danger active:bg-danger-dark',
  }

  const sizes = {
    sm: 'h-9 px-3',
    md: 'h-11 px-4',
    lg: 'h-14 px-6',
  }

  const textColor =
    variant === 'ghost' ? 'text-text-primary' : 'text-text-inverse'

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50',
        className
      )}
      {...rest}
    >
      <Text className={cn('font-medium', textColor, textSizes[size])}>
        {children}
      </Text>
    </Pressable>
  )
}
