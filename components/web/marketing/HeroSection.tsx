import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface HeroSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Small label above the title. */
  eyebrow?: ReactNode
  /** Main headline. */
  title: ReactNode
  /** Supporting paragraph. */
  subtitle?: ReactNode
  /** CTA buttons. */
  actions?: ReactNode
  /**
   * Optional right-side media (image/illustration); switches the layout to
   * two columns when present.
   */
  media?: ReactNode
}

/**
 * HeroSection — top-of-page marketing hero with headline, subcopy, and CTAs.
 */
export function HeroSection({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
  className,
  ...rest
}: HeroSectionProps) {
  return (
    <section className={cn('bg-background py-24', className)} {...rest}>
      <div
        className={cn(
          'mx-auto max-w-screen-xl px-6',
          media ? 'grid items-center gap-12 lg:grid-cols-2' : 'text-center'
        )}
      >
        <div className={cn(!media && 'mx-auto max-w-3xl')}>
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-yellow">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}
          {actions && (
            <div
              className={cn(
                'mt-8 flex flex-wrap gap-4',
                !media && 'justify-center'
              )}
            >
              {actions}
            </div>
          )}
        </div>
        {media && <div className="w-full">{media}</div>}
      </div>
    </section>
  )
}
