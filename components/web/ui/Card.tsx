import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding. Defaults to 'md'. */
  padding?: CardPadding
  /** Elevation. Defaults to 'md'. */
  shadow?: CardShadow
  /** Show a hairline border. Defaults to true. */
  bordered?: boolean
  /** Optional header content. */
  header?: ReactNode
  /** Optional footer content. */
  footer?: ReactNode
  /** Card body. */
  children: ReactNode
}

/**
 * Card — a surface container with optional header and footer slots.
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
}: CardProps) {
  const paddings: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const shadows: Record<CardShadow, string> = {
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
        <div className="px-6 py-4 font-semibold text-text-primary">
          {header}
        </div>
      )}
      <div className={paddings[padding]}>{children}</div>
      {footer && (
        <div className="px-6 py-4 text-text-secondary">{footer}</div>
      )}
    </div>
  )
}
