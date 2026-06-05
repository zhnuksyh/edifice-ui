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

export type SidebarStyleVariant = 'default' | 'floating' | 'compact'

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Top slot — brand/logo. */
  header?: ReactNode
  /** Grouped navigation. */
  groups: SidebarGroup[]
  /** Bottom slot — user menu, settings, etc. */
  footer?: ReactNode
  /**
   * Visual style. Defaults to 'default'.
   * - `default` — full-height rail with a right divider.
   * - `floating` — inset, fully-bordered, rounded card rail.
   * - `compact` — narrower, tighter rows for icon-forward navigation.
   */
  styleVariant?: SidebarStyleVariant
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
  styleVariant = 'default',
  className,
  ...rest
}: SidebarProps) {
  const compact = styleVariant === 'compact'

  const shell =
    styleVariant === 'floating'
      ? 'm-3 h-[calc(100%-1.5rem)] rounded-xl border border-grey-2A shadow-sm'
      : 'h-full border-r border-grey-2A'

  return (
    <aside
      className={cn(
        'flex shrink-0 flex-col overflow-hidden bg-grey-1A',
        compact ? 'w-52' : 'w-60',
        shell,
        className
      )}
      {...rest}
    >
      {header && (
        <div className={cn('border-b border-grey-2A px-5', compact ? 'py-3' : 'py-4')}>
          {header}
        </div>
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
                  'flex items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors',
                  compact ? 'py-1.5' : 'py-2',
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
