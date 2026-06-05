import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface LogoCloudLogo {
  /** Stable key. */
  id: string
  /** The logo — an <img>, inline SVG, or wordmark text. */
  content: ReactNode
  /** Optional accessible label / company name. */
  label?: string
}

export type LogoCloudStyleVariant = 'row' | 'grid' | 'bordered'

export interface LogoCloudProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Optional eyebrow/heading above the logos (e.g. 'Trusted by teams at'). */
  title?: ReactNode
  /** The logos to display. */
  logos: LogoCloudLogo[]
  /**
   * Visual layout style. Defaults to 'row'.
   * - `row` — logos wrap in a centered, evenly-spaced row.
   * - `grid` — logos sit in a responsive grid of equal cells.
   * - `bordered` — grid cells separated by hairline dividers.
   */
  styleVariant?: LogoCloudStyleVariant
}

/**
 * LogoCloud — a "trusted by" strip of partner/customer logos.
 *
 * Logos render muted by default and brighten on hover, keeping accent restraint.
 * Pass images, inline SVGs, or wordmarks as each logo's `content`.
 */
export function LogoCloud({
  title,
  logos,
  styleVariant = 'row',
  className,
  ...rest
}: LogoCloudProps) {
  if (logos.length === 0) return null

  const isGrid = styleVariant === 'grid' || styleVariant === 'bordered'
  const bordered = styleVariant === 'bordered'

  const logoItem = (logo: LogoCloudLogo) => (
    <div
      key={logo.id}
      aria-label={logo.label}
      className={cn(
        'flex h-8 items-center text-grey-66 opacity-70 transition-opacity duration-fast hover:opacity-100',
        isGrid && 'justify-center',
        bordered && 'py-6'
      )}
    >
      {logo.content}
    </div>
  )

  return (
    <section className={cn('py-16', className)} {...rest}>
      <div className="mx-auto max-w-screen-lg px-6">
        {title && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-grey-AA">
            {title}
          </p>
        )}
        {isGrid ? (
          <div
            className={cn(
              'grid grid-cols-2 items-center sm:grid-cols-3 lg:grid-cols-5',
              bordered
                ? 'gap-px overflow-hidden rounded-xl border border-grey-2A bg-grey-2A [&>*]:bg-background'
                : 'gap-8'
            )}
          >
            {logos.map(logoItem)}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {logos.map(logoItem)}
          </div>
        )}
      </div>
    </section>
  )
}
