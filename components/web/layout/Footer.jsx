import { cn } from '../../../utils/cn.js'

/**
 * Footer — site footer with grouped link columns and a bottom bar.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} [props.brand] - Brand mark / blurb (left).
 * @param {Array<{ title: string, links: Array<{ label: string, href: string }> }>} [props.columns]
 *   Grouped link columns.
 * @param {import('react').ReactNode} [props.bottom] - Bottom-bar content
 *   (defaults to a copyright line if omitted).
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
 */
export function Footer({ brand, columns = [], bottom, className, ...rest }) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn('border-t border-neutral-200 bg-surface', className)}
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
                      className="text-sm text-text-muted transition-colors duration-fast hover:text-primary-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-neutral-200 pt-6 text-sm text-text-muted">
          {bottom ?? `© ${year} All rights reserved.`}
        </div>
      </div>
    </footer>
  )
}
