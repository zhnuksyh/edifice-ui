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

export interface LogoCloudProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Optional eyebrow/heading above the logos (e.g. 'Trusted by teams at'). */
  title?: ReactNode
  /** The logos to display. */
  logos: LogoCloudLogo[]
}

/**
 * LogoCloud — a "trusted by" strip of partner/customer logos.
 *
 * Logos render muted by default and brighten on hover, keeping accent restraint.
 * Pass images, inline SVGs, or wordmarks as each logo's `content`.
 */
export function LogoCloud({ title, logos, className, ...rest }: LogoCloudProps) {
  if (logos.length === 0) return null

  return (
    <section className={cn('py-16', className)} {...rest}>
      <div className="mx-auto max-w-screen-lg px-6">
        {title && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-grey-AA">
            {title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => (
            <div
              key={logo.id}
              aria-label={logo.label}
              className="flex h-8 items-center text-grey-66 opacity-70 transition-opacity duration-fast hover:opacity-100"
            >
              {logo.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
