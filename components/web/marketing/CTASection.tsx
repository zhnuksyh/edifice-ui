import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface CTASectionProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** CTA headline. */
  title: ReactNode
  /** Supporting line. */
  subtitle?: ReactNode
  /** CTA buttons. */
  actions?: ReactNode
  /** Use the dark, high-contrast variant. Defaults to true. */
  inverted?: boolean
}

/**
 * CTASection — bold call-to-action band, typically near the page bottom.
 */
export function CTASection({
  title,
  subtitle,
  actions,
  inverted = true,
  className,
  ...rest
}: CTASectionProps) {
  return (
    <section
      className={cn(
        'py-20',
        inverted ? 'bg-primary-700' : 'bg-surface',
        className
      )}
      {...rest}
    >
      <div className="mx-auto max-w-screen-md px-6 text-center">
        <h2
          className={cn(
            'text-3xl font-bold sm:text-4xl',
            inverted ? 'text-text-inverse' : 'text-text-primary'
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              'mx-auto mt-4 max-w-2xl text-lg',
              inverted ? 'text-primary-100' : 'text-text-secondary'
            )}
          >
            {subtitle}
          </p>
        )}
        {actions && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {actions}
          </div>
        )}
      </div>
    </section>
  )
}
