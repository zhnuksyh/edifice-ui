import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type NavbarStyleVariant = 'bordered-bar' | 'pill' | 'split' | 'minimal'

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
  /**
   * Visual layout style. Defaults to 'bordered-bar'.
   * - `bordered-bar` — full-width blurred bar with a bottom hairline.
   * - `pill` — floating rounded pill, inset from the edges.
   * - `split` — links centered between brand (left) and actions (right).
   * - `minimal` — borderless, transparent; chrome-light.
   */
  styleVariant?: NavbarStyleVariant
}

/**
 * Navbar — top navigation bar with brand, links, and an actions slot.
 *
 * Four `styleVariant` layouts share one API: bordered-bar (default), pill,
 * split, and minimal.
 */
export function Navbar({
  brand,
  links = [],
  actions,
  sticky = true,
  styleVariant = 'bordered-bar',
  className,
  ...rest
}: NavbarProps) {
  const linkEls = links.length > 0 && (
    <ul className="hidden items-center gap-6 md:flex">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            aria-current={link.active ? 'page' : undefined}
            className={cn(
              'text-sm font-medium transition-colors duration-fast hover:text-text-primary',
              link.active ? 'text-yellow' : 'text-text-secondary'
            )}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )

  const brandEl = brand && (
    <div className="text-lg font-bold text-text-primary">{brand}</div>
  )
  const actionsEl = actions && (
    <div className="flex items-center gap-3">{actions}</div>
  )

  // Pill: a floating, self-contained bar inset from the viewport edges.
  if (styleVariant === 'pill') {
    return (
      <header
        className={cn(
          'z-40 w-full px-4 pt-4',
          sticky && 'sticky top-0',
          className
        )}
        {...rest}
      >
        <nav className="mx-auto flex h-14 max-w-screen-lg items-center justify-between gap-8 rounded-full border border-grey-2A bg-grey-1A/80 px-6 shadow-lg backdrop-blur">
          <div className="flex items-center gap-8">
            {brandEl}
            {linkEls}
          </div>
          {actionsEl}
        </nav>
      </header>
    )
  }

  // Split: brand left, links dead-center, actions right (three balanced zones).
  if (styleVariant === 'split') {
    return (
      <header
        className={cn(
          'z-40 w-full border-b border-grey-2A bg-grey-11/80 backdrop-blur',
          sticky && 'sticky top-0',
          className
        )}
        {...rest}
      >
        <nav className="mx-auto grid h-16 max-w-screen-xl grid-cols-[1fr_auto_1fr] items-center px-6">
          <div className="justify-self-start">{brandEl}</div>
          <div className="justify-self-center">{linkEls}</div>
          <div className="justify-self-end">{actionsEl}</div>
        </nav>
      </header>
    )
  }

  // Minimal: no border, transparent — leans on page background for separation.
  if (styleVariant === 'minimal') {
    return (
      <header
        className={cn('z-40 w-full', sticky && 'sticky top-0', className)}
        {...rest}
      >
        <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            {brandEl}
            {linkEls}
          </div>
          {actionsEl}
        </nav>
      </header>
    )
  }

  // bordered-bar (default).
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
          {brandEl}
          {linkEls}
        </div>
        {actionsEl}
      </nav>
    </header>
  )
}
