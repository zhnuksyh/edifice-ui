import { useState } from 'react'
import { cn } from '../../../utils/cn.js'

/**
 * Accordion — vertically stacked, expandable disclosure panels.
 *
 * Controlled internally. Supports single-open (default) or multi-open mode.
 *
 * @param {Object} props
 * @param {Array<{ id: string, title: import('react').ReactNode, content: import('react').ReactNode }>} props.items
 *   The panels to render.
 * @param {boolean} [props.allowMultiple=false] - Allow several panels open at once.
 * @param {string|string[]} [props.defaultOpen] - Initially open id(s).
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
 */
export function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen,
  className,
  ...rest
}) {
  const initial = Array.isArray(defaultOpen)
    ? defaultOpen
    : defaultOpen
      ? [defaultOpen]
      : []
  const [openIds, setOpenIds] = useState(initial)

  const toggle = (id) => {
    setOpenIds((prev) => {
      const isOpen = prev.includes(id)
      if (allowMultiple) {
        return isOpen ? prev.filter((x) => x !== id) : [...prev, id]
      }
      return isOpen ? [] : [id]
    })
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'divide-y divide-neutral-200 rounded-xl border border-neutral-200',
        className
      )}
      {...rest}
    >
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-text-primary transition-colors duration-fast hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
            >
              <span>{item.title}</span>
              <span
                className={cn(
                  'ml-4 shrink-0 transition-transform duration-normal',
                  isOpen && 'rotate-180'
                )}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-0 text-text-secondary">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
