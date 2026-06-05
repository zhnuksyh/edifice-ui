import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl'
export type CardStyleVariant = 'elevated' | 'outlined' | 'ghost'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inner padding. Defaults to 'md'. */
  padding?: CardPadding
  /**
   * Visual treatment. Defaults to 'elevated'.
   * - `elevated` — surface fill, hairline border, and a shadow (the original).
   * - `outlined` — surface fill and border, no shadow.
   * - `ghost` — transparent, no border or shadow.
   *
   * The explicit `shadow` and `bordered` props, when set, override the
   * treatment's defaults.
   */
  styleVariant?: CardStyleVariant
  /** Elevation. Overrides the styleVariant default when set. */
  shadow?: CardShadow
  /** Show a hairline border. Overrides the styleVariant default when set. */
  bordered?: boolean
  /** Brighten the border on hover (for clickable cards). */
  interactive?: boolean
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
  styleVariant = 'elevated',
  shadow,
  bordered,
  interactive = false,
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

  // Per-treatment defaults; explicit shadow/bordered props override them.
  const treatments: Record<
    CardStyleVariant,
    { fill: string; bordered: boolean; shadow: CardShadow }
  > = {
    elevated: { fill: 'bg-grey-1A', bordered: true, shadow: 'md' },
    outlined: { fill: 'bg-grey-1A', bordered: true, shadow: 'none' },
    ghost: { fill: 'bg-transparent', bordered: false, shadow: 'none' },
  }

  const treatment = treatments[styleVariant]
  const isBordered = bordered ?? treatment.bordered
  const resolvedShadow = shadow ?? treatment.shadow

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl',
        treatment.fill,
        isBordered && 'border border-grey-2A',
        interactive && 'transition-colors duration-fast hover:border-grey-44',
        shadows[resolvedShadow],
        className
      )}
      {...rest}
    >
      {header && (
        <div className="border-b border-grey-2A px-6 py-4 font-semibold text-text-primary">
          {header}
        </div>
      )}
      <div className={paddings[padding]}>{children}</div>
      {footer && (
        <div className="border-t border-grey-2A px-6 py-4 text-text-secondary">
          {footer}
        </div>
      )}
    </div>
  )
}
