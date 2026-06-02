import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Spinner } from './Spinner'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'danger'
  | 'purple'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to 'primary'. */
  variant?: ButtonVariant
  /** Size preset. Defaults to 'md'. */
  size?: ButtonSize
  /** Stretch to container width. */
  fullWidth?: boolean
  /** Show a spinner and disable the button. */
  loading?: boolean
  /** Icon rendered before the label. */
  leftIcon?: ReactNode
  /** Icon rendered after the label. */
  rightIcon?: ReactNode
  /**
   * Render a square icon-only button. `children` is the icon; provide an
   * accessible name via `aria-label`.
   */
  iconOnly?: boolean
  /** Button label/content. */
  children: ReactNode
}

const SPINNER_SIZE = { sm: 'sm', md: 'sm', lg: 'md' } as const

/**
 * Button — primary interactive control.
 *
 * Supports loading (spinner + disabled), leading/trailing icons, and an
 * icon-only mode.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
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
      'bg-transparent text-text-primary hover:bg-grey-22 focus-visible:ring-neutral-400',
    danger:
      'bg-danger text-text-inverse hover:bg-danger-dark focus-visible:ring-danger',
    purple: 'bg-purple text-white hover:bg-purple/90 focus-visible:ring-purple',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2.5',
  }

  const iconOnlySizes: Record<ButtonSize, string> = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  const spinnerTone =
    variant === 'ghost' ? 'neutral' : variant === 'primary' ? 'inverse' : 'inverse'

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        base,
        variants[variant],
        iconOnly ? iconOnlySizes[size] : sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner size={SPINNER_SIZE[size]} tone={spinnerTone} />
          {!iconOnly && <span>{children}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
