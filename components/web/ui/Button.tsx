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
export type ButtonStyleVariant = 'solid' | 'soft' | 'outline'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style (hue/role). Defaults to 'primary'. */
  variant?: ButtonVariant
  /**
   * Treatment, applied over `variant`'s hue. Optional — when omitted, the
   * button keeps its original per-variant look.
   * - `solid` — filled hue background.
   * - `soft` — tinted hue background, hue text.
   * - `outline` — transparent, hue border + hue text.
   *
   * The hue is derived from `variant` (primary→accent yellow, danger→red,
   * purple→purple; secondary/accent/ghost map to accent).
   */
  styleVariant?: ButtonStyleVariant
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
/** Hues available to the styleVariant treatment axis. */
type ButtonHue = 'accent' | 'danger' | 'purple'

export function Button({
  variant = 'primary',
  styleVariant,
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
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11 disabled:opacity-50 disabled:pointer-events-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-600 text-text-inverse hover:bg-primary-700 active:bg-primary-700 focus-visible:ring-primary-500',
    // Bordered neutral button — the everyday non-primary action.
    secondary:
      'border border-grey-2A bg-grey-1A text-text-primary hover:border-grey-44 hover:bg-grey-22 active:bg-grey-2A focus-visible:ring-grey-44',
    accent:
      'bg-accent-500 text-text-inverse hover:bg-accent-600 active:bg-accent-600 focus-visible:ring-accent-400',
    // Borderless until hover — leans neutral, accent only on focus ring.
    ghost:
      'bg-transparent text-text-secondary hover:bg-grey-22 hover:text-text-primary active:bg-grey-2A focus-visible:ring-grey-44',
    danger:
      'bg-danger text-text-inverse hover:bg-danger-dark active:bg-danger-dark focus-visible:ring-danger',
    purple:
      'bg-purple text-white hover:bg-purple/90 active:bg-purple/90 focus-visible:ring-purple',
  }

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-9 px-3.5 text-sm gap-1.5',
    md: 'h-11 px-4 text-base gap-2',
    lg: 'h-12 px-6 text-lg gap-2.5',
  }

  const iconOnlySizes: Record<ButtonSize, string> = {
    sm: 'h-9 w-9 text-sm',
    md: 'h-11 w-11 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  // Derive a hue from variant for the optional styleVariant treatment axis.
  const hue: ButtonHue =
    variant === 'danger' ? 'danger' : variant === 'purple' ? 'purple' : 'accent'

  // treatment × hue — only used when styleVariant is set.
  const treatments: Record<ButtonStyleVariant, Record<ButtonHue, string>> = {
    solid: {
      accent:
        'bg-accent-500 text-text-inverse hover:bg-accent-600 active:bg-accent-600 focus-visible:ring-accent-400',
      danger:
        'bg-danger text-text-inverse hover:bg-danger-dark active:bg-danger-dark focus-visible:ring-danger',
      purple:
        'bg-purple text-white hover:bg-purple/90 active:bg-purple/90 focus-visible:ring-purple',
    },
    soft: {
      accent:
        'bg-yellow-tint text-yellow hover:bg-yellow-tint/70 active:bg-yellow-tint/70 focus-visible:ring-yellow/40',
      danger:
        'bg-danger-tint text-danger hover:bg-danger-tint/70 active:bg-danger-tint/70 focus-visible:ring-danger/40',
      purple:
        'bg-purple-tint text-purple hover:bg-purple-tint/70 active:bg-purple-tint/70 focus-visible:ring-purple/40',
    },
    outline: {
      accent:
        'border border-yellow text-yellow hover:bg-yellow-tint active:bg-yellow-tint focus-visible:ring-yellow/40',
      danger:
        'border border-danger text-danger hover:bg-danger-tint active:bg-danger-tint focus-visible:ring-danger/40',
      purple:
        'border border-purple text-purple hover:bg-purple-tint active:bg-purple-tint focus-visible:ring-purple/40',
    },
  }

  // styleVariant (when set) wins; otherwise keep the original per-variant look.
  const appearance = styleVariant
    ? treatments[styleVariant][hue]
    : variants[variant]

  // Soft/outline and secondary/ghost render hue/dark text on light, so they
  // need the neutral spinner; solid treatments and filled variants use inverse.
  const neutralSpinner =
    styleVariant === 'soft' ||
    styleVariant === 'outline' ||
    (!styleVariant && (variant === 'ghost' || variant === 'secondary'))
  const spinnerTone = neutralSpinner ? 'neutral' : 'inverse'

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        base,
        appearance,
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
