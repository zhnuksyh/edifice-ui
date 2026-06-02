import { cn } from '../../../utils/cn.js'

/**
 * Card — a surface container with optional header and footer slots.
 *
 * @param {Object} props
 * @param {('none'|'sm'|'md'|'lg')} [props.padding='md'] - Inner padding.
 * @param {('none'|'sm'|'md'|'lg'|'xl')} [props.shadow='md'] - Elevation.
 * @param {boolean} [props.bordered=true] - Show a hairline border.
 * @param {import('react').ReactNode} [props.header] - Optional header content.
 * @param {import('react').ReactNode} [props.footer] - Optional footer content.
 * @param {import('react').ReactNode} props.children - Card body.
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
 */
export function Card({
  padding = 'md',
  shadow = 'md',
  bordered = true,
  header,
  footer,
  children,
  className,
  ...rest
}) {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const shadows = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }

  return (
    <div
      className={cn(
        'rounded-xl bg-surface overflow-hidden',
        bordered && 'border border-neutral-200',
        shadows[shadow],
        className
      )}
      {...rest}
    >
      {header && (
        <div className="border-b border-neutral-200 px-6 py-4 font-semibold text-text-primary">
          {header}
        </div>
      )}
      <div className={paddings[padding]}>{children}</div>
      {footer && (
        <div className="border-t border-neutral-200 px-6 py-4 text-text-secondary">
          {footer}
        </div>
      )}
    </div>
  )
}
