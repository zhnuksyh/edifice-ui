import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export type MenuAlign = 'start' | 'end'
export type MenuStyleVariant = 'elevated' | 'outlined'

/** A selectable action. */
export interface MenuAction {
  kind?: 'action'
  /** Item label. */
  label: ReactNode
  /** Optional leading icon. */
  icon?: ReactNode
  /** Called when the item is selected. */
  onSelect?: () => void
  /** Style as a destructive action. */
  danger?: boolean
  /** Disable the item. */
  disabled?: boolean
}

/** A non-interactive divider or section label. */
export interface MenuDivider {
  kind: 'separator' | 'label'
  /** Text for a `label` item. */
  label?: ReactNode
}

export type MenuItem = MenuAction | MenuDivider

export interface MenuProps {
  /** The element that opens the menu. */
  trigger: ReactNode
  /** Menu items (actions, separators, labels). */
  items: MenuItem[]
  /** Which side of the trigger to align to. Defaults to 'start'. */
  align?: MenuAlign
  /**
   * Surface treatment. Defaults to 'elevated'.
   * - `elevated` — hairline border with a prominent shadow (the original).
   * - `outlined` — a brighter border and no shadow (flatter, crisper).
   */
  styleVariant?: MenuStyleVariant
  /** Extra classes merged onto the panel via cn(). */
  className?: string
}

const isAction = (item: MenuItem): item is MenuAction =>
  item.kind === undefined || item.kind === 'action'

/**
 * Menu — a dropdown of actions anchored to a trigger.
 *
 * Unlike Select (which picks a value), Menu fires actions. Supports keyboard
 * navigation (Arrow keys, Home/End, Enter, Escape), separators and section
 * labels, danger and disabled items, and closes on select / outside click /
 * Escape. ARIA menu roles included.
 */
export function Menu({
  trigger,
  items,
  align = 'start',
  styleVariant = 'elevated',
  className,
}: MenuProps) {
  const surfaces: Record<MenuStyleVariant, string> = {
    elevated: 'border-grey-2A shadow-xl',
    outlined: 'border-grey-44 shadow-none',
  }
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false), open)
  const listRef = useRef<HTMLDivElement>(null)

  // Indices of focusable (enabled action) items.
  const actionIndices = items
    .map((item, i) => (isAction(item) && !item.disabled ? i : -1))
    .filter((i) => i >= 0)

  const move = (dir: 1 | -1) => {
    setActiveIndex((prev) => {
      if (actionIndices.length === 0) return prev
      const pos = actionIndices.indexOf(prev)
      const nextPos =
        pos === -1
          ? dir === 1
            ? 0
            : actionIndices.length - 1
          : (pos + dir + actionIndices.length) % actionIndices.length
      return actionIndices[nextPos]
    })
  }

  const select = (index: number) => {
    const item = items[index]
    if (item && isAction(item) && !item.disabled) {
      item.onSelect?.()
      setOpen(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        open ? move(1) : setOpen(true)
        break
      case 'ArrowUp':
        e.preventDefault()
        open ? move(-1) : setOpen(true)
        break
      case 'Home':
        if (open) {
          e.preventDefault()
          setActiveIndex(actionIndices[0] ?? -1)
        }
        break
      case 'End':
        if (open) {
          e.preventDefault()
          setActiveIndex(actionIndices[actionIndices.length - 1] ?? -1)
        }
        break
      case 'Enter':
      case ' ':
        if (open && activeIndex >= 0) {
          e.preventDefault()
          select(activeIndex)
        }
        break
      case 'Escape':
        setOpen(false)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (open) setActiveIndex(actionIndices[0] ?? -1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return
    const node = listRef.current.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  return (
    <div ref={ref} className="relative inline-flex" onKeyDown={onKeyDown}>
      <span
        onClick={() => setOpen((o) => !o)}
        className="contents"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </span>
      {open && (
        <div
          ref={listRef}
          role="menu"
          className={cn(
            'absolute top-full z-50 mt-2 min-w-[12rem] overflow-auto rounded-lg border bg-grey-22 p-1',
            surfaces[styleVariant],
            align === 'end' ? 'right-0' : 'left-0',
            className
          )}
        >
          {items.map((item, i) => {
            if (item.kind === 'separator') {
              return <div key={i} role="separator" className="my-1 h-px bg-grey-2A" />
            }
            if (item.kind === 'label') {
              return (
                <div
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-text-muted"
                >
                  {item.label}
                </div>
              )
            }
            const action = item as MenuAction
            const active = i === activeIndex
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                data-index={i}
                disabled={action.disabled}
                onClick={() => select(i)}
                onMouseEnter={() => !action.disabled && setActiveIndex(i)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors duration-fast disabled:cursor-not-allowed disabled:opacity-50',
                  action.danger ? 'text-danger' : 'text-text-primary',
                  active && !action.disabled && (action.danger ? 'bg-danger-tint' : 'bg-grey-2A')
                )}
              >
                {action.icon && <span className="shrink-0">{action.icon}</span>}
                {action.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
