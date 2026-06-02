import { cn } from '../../../utils/cn.js'

/**
 * Navbar — top navigation bar with brand, links, and an actions slot.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} [props.brand] - Logo or brand name (left).
 * @param {Array<{ label: string, href: string, active?: boolean }>} [props.links]
 *   Primary navigation links (center/left).
 * @param {import('react').ReactNode} [props.actions] - Right-aligned actions
 *   (e.g. buttons, avatar).
 * @param {boolean} [props.sticky=true] - Stick to top on scroll.
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
 */
export function Navbar({
  brand,
  links = [],
  actions,
  sticky = true,
  className,
  ...rest
}) {
  return (
    <header
      className={cn(
        'z-40 w-full border-b border-neutral-200 bg-surface/80 backdrop-blur',
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
