import { Pressable, Text, type PressableProps } from 'react-native'
import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /** Visual style. Defaults to 'primary'. */
  variant?: ButtonVariant
  /** Size preset. Defaults to 'md'. */
  size?: ButtonSize
  /** Stretch to container width. */
  fullWidth?: boolean
  /** Button label/content. */
  children: ReactNode
  /** Extra NativeWind classes merged via cn(). */
  className?: string
}

/**
 * Button (native) — primary interactive control for React Native + NativeWind.
 *
 * Mirrors the web Button props API.
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
}: ButtonProps) {
  const base = 'flex-row items-center justify-center rounded-lg'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-600 active:bg-secondary-700',
    accent: 'bg-accent-500 active:bg-accent-600',
    ghost: 'bg-transparent active:bg-neutral-100',
    danger: 'bg-danger active:bg-danger-dark',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-3',
    md: 'h-11 px-4',
    lg: 'h-14 px-6',
  }

  const textColor =
    variant === 'ghost' ? 'text-text-primary' : 'text-text-inverse'

  const textSizes: Record<ButtonSize, string> = {
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
