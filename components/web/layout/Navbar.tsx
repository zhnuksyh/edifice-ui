import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Logo or brand name (left). */
  brand?: ReactNode
  /** Primary navigation links (center/left). */
  links?: NavLink[]
  /** Right-aligned actions (e.g. buttons, avatar). */
  actions?: ReactNode
  /** Stick to top on scroll. Defaults to true. */
  sticky?: boolean
}

/**
 * Navbar — top navigation bar with brand, links, and an actions slot.
 */
export function Navbar({
  brand,
  links = [],
  actions,
  sticky = true,
  className,
  ...rest
}: NavbarProps) {
  return (
    <header
      className={cn(
        'z-40 w-full border-b border-grey-2A bg-grey-11/80 backdrop-blur',
        sticky && 'sticky top-0',
        className
      )}
      {...rest}
    >
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          {brand && (
            <div className="text-lg font-bold text-text-primary">{brand}</div>
          )}
          {links.length > 0 && (
            <ul className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={link.active ? 'page' : undefined}
                    className={cn(
                      'text-sm font-medium transition-colors duration-fast hover:text-primary-600',
                      link.active ? 'text-primary-600' : 'text-text-secondary'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </nav>
    </header>
  )
}
