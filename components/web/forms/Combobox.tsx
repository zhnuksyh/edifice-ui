import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  /** Visible label text. */
  label?: string
  /** Options to filter and choose from. */
  options: ComboboxOption[]
  /** Controlled selected value. */
  value?: string
  /** Default selected value (uncontrolled). */
  defaultValue?: string
  /** Called with the selected value when it changes. */
  onChange?: (value: string) => void
  /** Placeholder for the search input. */
  placeholder?: string
  /** Message when no option matches the query. Defaults to 'No results'. */
  emptyMessage?: string
  /** Error message; sets invalid styling. */
  error?: string
  /** Helper text shown below the field. */
  hint?: string
  /** Mark the field required. */
  required?: boolean
  /** Disable the control. */
  disabled?: boolean
  /** Field id; auto-generated if omitted. */
  id?: string
  /** Name for native form submission. */
  name?: string
  /** Extra classes merged onto the input via cn(). */
  className?: string
}

/**
 * Combobox — a searchable select: type to filter options, then pick one.
 *
 * A custom listbox over a text input, themed to match Edifice. Supports keyboard
 * navigation (Arrow keys, Enter, Escape), click-outside to close, and a hidden
 * input for form submission. Controlled via `value`/`onChange`, or uncontrolled
 * via `defaultValue`. For a non-filterable picker use Select.
 */
export function Combobox({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Search…',
  emptyMessage = 'No results',
  error,
  hint,
  required = false,
  disabled = false,
  id,
  name,
  className,
}: ComboboxProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const listboxId = `${fieldId}-listbox`
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined

  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? '')
  const selected = isControlled ? value : internal
  const selectedOption = options.find((o) => o.value === selected)

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useClickOutside<HTMLDivElement>(() => closeMenu(), open)
  const listRef = useRef<HTMLUListElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((o) => o.label.toLowerCase().includes(q))
  }, [options, query])

  const closeMenu = () => {
    setOpen(false)
    setQuery('')
  }

  const commit = (option: ComboboxOption) => {
    if (option.disabled) return
    if (!isControlled) setInternal(option.value)
    onChange?.(option.value)
    closeMenu()
  }

  const step = (dir: 1 | -1) => {
    setActiveIndex((prev) => {
      let next = prev
      for (let i = 0; i < filtered.length; i++) {
        next = (next + dir + filtered.length) % filtered.length
        if (!filtered[next]?.disabled) return next
      }
      return prev
    })
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!open) setOpen(true)
        else step(1)
        break
      case 'ArrowUp':
        event.preventDefault()
        if (open) step(-1)
        break
      case 'Enter':
        if (open && filtered[activeIndex]) {
          event.preventDefault()
          commit(filtered[activeIndex])
        }
        break
      case 'Escape':
        closeMenu()
        break
      default:
        break
    }
  }

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return
    const node = listRef.current.children[activeIndex] as HTMLElement | undefined
    node?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  const displayValue = open ? query : selectedOption?.label ?? ''

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <input
          id={fieldId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          required={required}
          disabled={disabled}
          value={displayValue}
          placeholder={selectedOption && !open ? selectedOption.label : placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!open) setOpen(true)
          }}
          onKeyDown={onKeyDown}
          className={cn(
            'h-10 w-full rounded-lg border bg-surface px-3 pr-9 text-base text-text-primary placeholder:text-text-secondary transition-colors duration-fast focus:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-danger focus-visible:ring-danger'
              : 'border-grey-2A hover:border-grey-44 focus-visible:ring-primary-500',
            className
          )}
        />
        <ChevronDown
          className={cn(
            'pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary transition-transform duration-fast',
            open && 'rotate-180'
          )}
          strokeWidth={2}
          aria-hidden="true"
        />

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-grey-2A bg-grey-1A p-1 shadow-lg"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-text-secondary">{emptyMessage}</li>
            ) : (
              filtered.map((opt, index) => {
                const isSelected = opt.value === selected
                const isActive = index === activeIndex
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onMouseEnter={() => !opt.disabled && setActiveIndex(index)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => commit(opt)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm',
                      opt.disabled && 'cursor-not-allowed opacity-50',
                      isActive && !opt.disabled
                        ? 'bg-grey-2A text-text-primary'
                        : 'text-text-secondary',
                      isSelected && 'text-primary-600'
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check
                        className="ml-2 h-4 w-4 shrink-0"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                )
              })
            )}
          </ul>
        )}

        {name && <input type="hidden" name={name} value={selected ?? ''} />}
      </div>

      {error ? (
        <p id={`${fieldId}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${fieldId}-hint`} className="text-sm text-text-secondary">
            {hint}
          </p>
        )
      )}
    </div>
  )
}
