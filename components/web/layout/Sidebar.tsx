import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface SidebarItem {
  /** Stable key / id. */
  id: string
  /** Link label. */
  label: ReactNode
  /** Destination; omit for a non-link (e.g. button-driven) item. */
  href?: string
  /** Optional leading icon. */
  icon?: ReactNode
  /** Marks the current item. */
  active?: boolean
  /** Click handler (use when there's no `href`). */
  onClick?: () => void
}

export interface SidebarGroup {
  /** Stable key. */
  id: string
  /** Optional group heading. */
  label?: ReactNode
  /** Items in this group. */
  items: SidebarItem[]
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Top slot — brand/logo. */
  header?: ReactNode
  /** Grouped navigation. */
  groups: SidebarGroup[]
  /** Bottom slot — user menu, settings, etc. */
  footer?: ReactNode
}

/**
 * Sidebar — a vertical navigation rail for app shells.
 *
 * Renders grouped, active-aware items with optional icons, plus header and
 * footer slots. Pair with a main content area in a flex row. For top-of-page
 * navigation use Navbar instead.
 */
export function Sidebar({
  header,
  groups,
  footer,
  className,
  ...rest
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full w-60 shrink-0 flex-col border-r border-grey-2A bg-grey-1A',
        className
      )}
      {...rest}
    >
      {header && (
        <div className="border-b border-grey-2A px-5 py-4">{header}</div>
      )}
      <nav className="flex-1 overflow-y-auto p-3">
        {groups.map((group, index) => (
          <div key={group.id} className={cn(index > 0 && 'mt-6')}>
            {group.label && (
              <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wide text-text-muted">
                {group.label}
              </p>
            )}
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const content = (
                  <>
                    {item.icon && (
                      <span className="shrink-0 text-text-muted">{item.icon}</span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </>
                )
                const classes = cn(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-grey-22 text-yellow'
                    : 'text-text-secondary hover:bg-grey-22 hover:text-text-primary'
                )
                return (
                  <li key={item.id}>
                    {item.href ? (
                      <a
                        href={item.href}
                        aria-current={item.active ? 'page' : undefined}
                        className={classes}
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={item.onClick}
                        aria-current={item.active ? 'page' : undefined}
                        className={cn(classes, 'w-full text-left')}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      {footer && (
        <div className="border-t border-grey-2A px-5 py-4">{footer}</div>
      )}
    </aside>
  )
}
