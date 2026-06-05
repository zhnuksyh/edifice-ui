import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type FooterStyleVariant = 'columns' | 'minimal' | 'centered'

export interface FooterColumn {
  title: string
  links: Array<{ label: string; href: string }>
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Brand mark / blurb (left). */
  brand?: ReactNode
  /** Grouped link columns. */
  columns?: FooterColumn[]
  /** Bottom-bar content (defaults to a copyright line if omitted). */
  bottom?: ReactNode
  /**
   * Visual layout style. Defaults to 'columns'.
   * - `columns` — brand + grouped link columns in a grid, bottom bar below.
   * - `minimal` — single row: brand left, flattened inline links right.
   * - `centered` — brand, inline links, and bottom line stacked and centered.
   */
  styleVariant?: FooterStyleVariant
}

/**
 * Footer — site footer with grouped link columns and a bottom bar.
 *
 * Three `styleVariant` layouts share one API: columns (default), minimal,
 * and centered.
 */
export function Footer({
  brand,
  columns = [],
  bottom,
  styleVariant = 'columns',
  className,
  ...rest
}: FooterProps) {
  const year = new Date().getFullYear()
  const bottomLine = bottom ?? `© ${year} All rights reserved.`

  // Flattened single list of links (used by minimal + centered).
  const flatLinks = columns.flatMap((col) => col.links)
  const inlineLinks = flatLinks.length > 0 && (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {flatLinks.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            className="text-sm text-text-secondary transition-colors duration-fast hover:text-text-primary"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )

  if (styleVariant === 'minimal') {
    return (
      <footer
        className={cn('border-t border-grey-2A bg-grey-11', className)}
        {...rest}
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          {brand && <div className="text-text-secondary">{brand}</div>}
          {inlineLinks}
          <div className="text-sm text-text-muted">{bottomLine}</div>
        </div>
      </footer>
    )
  }

  if (styleVariant === 'centered') {
    return (
      <footer
        className={cn('border-t border-grey-2A bg-grey-11', className)}
        {...rest}
      >
        <div className="mx-auto flex max-w-screen-md flex-col items-center gap-6 px-6 py-12 text-center">
          {brand && <div className="text-text-secondary">{brand}</div>}
          {inlineLinks}
          <div className="text-sm text-text-muted">{bottomLine}</div>
        </div>
      </footer>
    )
  }

  // columns (default).
  return (
    <footer
      className={cn('border-t border-grey-2A bg-grey-11', className)}
      {...rest}
    >
      <div className="mx-auto max-w-screen-xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {brand && (
            <div className="md:col-span-1 text-text-secondary">{brand}</div>
          )}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-text-primary">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors duration-fast hover:text-text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-grey-2A pt-6 text-sm text-text-secondary">
          {bottomLine}
        </div>
      </div>
    </footer>
  )
}
