import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps {
  /** Visible label text. */
  label?: string
  /** Options to render. */
  options: SelectOption[]
  /** Controlled selected value. */
  value?: string
  /** Default selected value (uncontrolled). */
  defaultValue?: string
  /** Called with the selected value when it changes. */
  onChange?: (value: string) => void
  /** Placeholder shown when nothing is selected. */
  placeholder?: string
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
  /** Name for the hidden input (native form submission). */
  name?: string
  /** Extra classes merged onto the trigger via cn(). */
  className?: string
}

/**
 * Select — labeled dropdown with a fully themed popup.
 *
 * A custom listbox (not a native `<select>`) so the open panel matches the dark,
 * rounded Edifice style. Supports keyboard navigation (Arrow keys, Enter, Home,
 * End, Escape), click-outside to close, and a hidden input for form submission.
 * Controlled via `value`/`onChange`, or uncontrolled via `defaultValue`.
 */
export function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  error,
  hint,
  required = false,
  disabled = false,
  id,
  name,
  className,
}: SelectProps) {
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

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useClickOutside<HTMLDivElement>(() => setOpen(false), open)
  const listRef = useRef<HTMLUListElement>(null)

  const selectedOption = options.find((o) => o.value === selected)

  const commit = (next: string) => {
    if (!isControlled) {
      setInternal(next)
    }
    onChange?.(next)
    setOpen(false)
  }

  const openMenu = () => {
    if (disabled) return
    setOpen(true)
    const current = options.findIndex((o) => o.value === selected)
    setActiveIndex(current >= 0 ? current : 0)
  }

  // Move active highlight to the next/previous enabled option.
  const step = (dir: 1 | -1) => {
    setActiveIndex((prev) => {
      let next = prev
      for (let i = 0; i < options.length; i++) {
        next = (next + dir + options.length) % options.length
        if (!options[next]?.disabled) return next
      }
      return prev
    })
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        open ? step(1) : openMenu()
        break
      case 'ArrowUp':
        event.preventDefault()
        open ? step(-1) : openMenu()
        break
      case 'Home':
        if (open) {
          event.preventDefault()
          setActiveIndex(options.findIndex((o) => !o.disabled))
        }
        break
      case 'End':
        if (open) {
          event.preventDefault()
          for (let i = options.length - 1; i >= 0; i--) {
            if (!options[i].disabled) {
              setActiveIndex(i)
              break
            }
          }
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (open && activeIndex >= 0) {
          const opt = options[activeIndex]
          if (opt && !opt.disabled) commit(opt.value)
        } else {
          openMenu()
        }
        break
      case 'Escape':
        setOpen(false)
        break
      default:
        break
    }
  }

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return
    const node = listRef.current.children[activeIndex] as HTMLElement | undefined
    node?.scrollIntoView({ block: 'nearest' })
  }, [open, activeIndex])

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={fieldId} className="text-sm font-medium text-text-primary">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <div ref={containerRef} className="relative">
        <button
          id={fieldId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-grey-1A px-3 text-left text-base transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11 disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-danger focus-visible:ring-danger'
              : 'border-grey-2A hover:border-grey-44 focus-visible:ring-yellow',
            selectedOption ? 'text-text-primary' : 'text-text-secondary',
            className
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-text-secondary transition-transform duration-fast',
              open && 'rotate-180'
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-grey-2A bg-grey-1A p-1 shadow-lg"
          >
            {options.map((opt, index) => {
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
                  onClick={() => !opt.disabled && commit(opt.value)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm',
                    opt.disabled && 'cursor-not-allowed opacity-50',
                    isActive && !opt.disabled ? 'bg-grey-2A text-text-primary' : 'text-text-secondary',
                    isSelected && 'text-yellow'
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
            })}
          </ul>
        )}

        {name && <input type="hidden" name={name} value={selected} />}
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
