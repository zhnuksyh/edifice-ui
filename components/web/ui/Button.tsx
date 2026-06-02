import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to 'primary'. */
  variant?: ButtonVariant
  /** Size preset. Defaults to 'md'. */
  size?: ButtonSize
  /** Stretch to container width. */
  fullWidth?: boolean
  /** Button label/content. */
  children: ReactNode
}

/**
 * Button — primary interactive control.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  children,
  className,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-600 text-text-inverse hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary:
      'bg-secondary-600 text-text-inverse hover:bg-secondary-700 focus-visible:ring-secondary-500',
    accent:
      'bg-accent-500 text-text-inverse hover:bg-accent-600 focus-visible:ring-accent-400',
    ghost:
      'bg-transparent text-text-primary hover:bg-neutral-100 focus-visible:ring-neutral-400',
    danger:
      'bg-danger text-text-inverse hover:bg-danger-dark focus-visible:ring-danger',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2.5',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
