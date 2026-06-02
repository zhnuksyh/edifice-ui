import { cn } from '../../../utils/cn.js'

/**
 * Button — primary interactive control.
 *
 * @param {Object} props
 * @param {('primary'|'secondary'|'accent'|'ghost'|'danger')} [props.variant='primary']
 *   Visual style.
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size preset.
 * @param {boolean} [props.fullWidth=false] - Stretch to container width.
 * @param {boolean} [props.disabled=false] - Disable interaction.
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Native button type.
 * @param {import('react').ReactNode} props.children - Button label/content.
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
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
}) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
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

  const sizes = {
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
