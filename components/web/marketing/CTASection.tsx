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
        inverted ? 'bg-grey-0A' : 'bg-grey-1A',
        className
      )}
      {...rest}
    >
      <div className="mx-auto max-w-screen-md px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-grey-F0 sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-grey-AA">
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
