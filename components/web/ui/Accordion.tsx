import { useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface AccordionItem {
  id: string
  title: ReactNode
  content: ReactNode
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** The panels to render. */
  items: AccordionItem[]
  /** Allow several panels open at once. Defaults to false. */
  allowMultiple?: boolean
  /** Initially open id(s). */
  defaultOpen?: string | string[]
}

/**
 * Accordion — vertically stacked, expandable disclosure panels.
 *
 * Controlled internally. Supports single-open (default) or multi-open mode.
 */
export function Accordion({
  items = [],
  allowMultiple = false,
  defaultOpen,
  className,
  ...rest
}: AccordionProps) {
  const initial = Array.isArray(defaultOpen)
    ? defaultOpen
    : defaultOpen
      ? [defaultOpen]
      : []
  const [openIds, setOpenIds] = useState<string[]>(initial)

  const toggle = (id: string) => {
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
          <div
            key={item.id}
            className="group transition-colors duration-fast hover:bg-grey-22"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500"
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
