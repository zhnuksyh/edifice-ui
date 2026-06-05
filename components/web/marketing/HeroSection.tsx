import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type HeroStyleVariant = 'centered' | 'left-aligned' | 'split-image'

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
  /** Optional media (image/illustration). Shown beside copy in `split-image`. */
  media?: ReactNode
  /**
   * Visual layout style. Defaults to 'centered'.
   * - `centered` — copy centered in a single column.
   * - `left-aligned` — copy left-aligned in a single column.
   * - `split-image` — copy left, `media` right (two columns on large screens).
   */
  styleVariant?: HeroStyleVariant
}

/**
 * HeroSection — top-of-page marketing hero with headline, subcopy, and CTAs.
 *
 * Three `styleVariant` layouts share one API: centered (default), left-aligned,
 * and split-image (pairs copy with the `media` slot).
 */
export function HeroSection({
  eyebrow,
  title,
  subtitle,
  actions,
  media,
  styleVariant = 'centered',
  className,
  ...rest
}: HeroSectionProps) {
  const split = styleVariant === 'split-image'
  const centered = styleVariant === 'centered'

  return (
    <section className={cn('bg-background py-24', className)} {...rest}>
      <div
        className={cn(
          'mx-auto max-w-screen-xl px-6',
          split ? 'grid items-center gap-12 lg:grid-cols-2' : 'w-full',
          centered && 'text-center'
        )}
      >
        <div className={cn(centered && 'mx-auto max-w-3xl')}>
          {eyebrow && (
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-yellow">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p
              className={cn(
                'mt-6 text-lg leading-relaxed text-text-secondary',
                centered && 'mx-auto max-w-2xl'
              )}
            >
              {subtitle}
            </p>
          )}
          {actions && (
            <div
              className={cn(
                'mt-8 flex flex-wrap gap-4',
                centered && 'justify-center'
              )}
            >
              {actions}
            </div>
          )}
        </div>
        {split && media && <div className="w-full">{media}</div>}
      </div>
    </section>
  )
}
