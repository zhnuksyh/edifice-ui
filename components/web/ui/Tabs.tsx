import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface TabItem {
  /** Unique value identifying the tab. */
  value: string
  /** Tab button label. */
  label: ReactNode
  /** Panel content shown when the tab is active. */
  content: ReactNode
  /** Disable this tab. */
  disabled?: boolean
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** The tabs to render. */
  items: TabItem[]
  /** Initially active tab value (uncontrolled). Defaults to the first item. */
  defaultValue?: string
  /** Controlled active tab value. */
  value?: string
  /** Called with the next value when a tab is selected. */
  onValueChange?: (value: string) => void
}

/**
 * Tabs — switch between panels of content.
 *
 * Uncontrolled by default (manages its own active tab); pass `value` +
 * `onValueChange` to control it. Includes ARIA tab roles.
 */
export function Tabs({
  items = [],
  defaultValue,
  value,
  onValueChange,
  className,
  ...rest
}: TabsProps) {
  const baseId = useId()
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(
    defaultValue ?? items[0]?.value ?? ''
  )
  const active = isControlled ? value : internal

  if (items.length === 0) {
    return null
  }

  const select = (next: string) => {
    if (!isControlled) {
      setInternal(next)
    }
    onValueChange?.(next)
  }

  const activePanel = items.find((item) => item.value === active)

  return (
    <div className={cn('flex flex-col gap-4', className)} {...rest}>
      <div role="tablist" className="flex gap-1 border-b border-neutral-200">
        {items.map((item) => {
          const selected = item.value === active
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.value}`}
              disabled={item.disabled}
              onClick={() => select(item.value)}
              className={cn(
                '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50',
                selected
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {activePanel && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activePanel.value}`}
          aria-labelledby={`${baseId}-tab-${activePanel.value}`}
          className="text-text-secondary"
        >
          {activePanel.content}
        </div>
      )}
    </div>
  )
}
