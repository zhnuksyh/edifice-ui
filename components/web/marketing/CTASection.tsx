import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type CTAStyleVariant = 'banner' | 'boxed' | 'gradient'

export interface CTASectionProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** CTA headline. */
  title: ReactNode
  /** Supporting line. */
  subtitle?: ReactNode
  /** CTA buttons. */
  actions?: ReactNode
  /** Use the dark, high-contrast surface. Defaults to true. (banner/boxed only.) */
  inverted?: boolean
  /**
   * Visual layout style. Defaults to 'banner'.
   * - `banner` — full-bleed flat band across the page width.
   * - `boxed` — contained, bordered, rounded card centered on the page.
   * - `gradient` — full-bleed band with an accent-tinted gradient wash.
   */
  styleVariant?: CTAStyleVariant
}

/**
 * CTASection — bold call-to-action band, typically near the page bottom.
 *
 * Three `styleVariant` looks share one API: banner (default), boxed, and
 * gradient.
 */
export function CTASection({
  title,
  subtitle,
  actions,
  inverted = true,
  styleVariant = 'banner',
  className,
  ...rest
}: CTASectionProps) {
  const inner = (
    <div className="mx-auto max-w-screen-md px-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-grey-F0 sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-grey-AA">{subtitle}</p>
      )}
      {actions && (
        <div className="mt-8 flex flex-wrap justify-center gap-4">{actions}</div>
      )}
    </div>
  )

  if (styleVariant === 'boxed') {
    return (
      <section className={cn('px-6 py-20', className)} {...rest}>
        <div
          className={cn(
            'mx-auto max-w-screen-lg rounded-2xl border border-grey-2A py-16 shadow-lg',
            inverted ? 'bg-grey-0A' : 'bg-grey-1A'
          )}
        >
          {inner}
        </div>
      </section>
    )
  }

  if (styleVariant === 'gradient') {
    return (
      <section
        className={cn(
          'bg-gradient-to-b from-grey-1A via-grey-0A to-grey-0A py-20',
          className
        )}
        {...rest}
      >
        {inner}
      </section>
    )
  }

  // banner (default).
  return (
    <section
      className={cn('py-20', inverted ? 'bg-grey-0A' : 'bg-grey-1A', className)}
      {...rest}
    >
      {inner}
    </section>
  )
}
