import { useEffect } from 'react'
import { cn } from '../../../utils/cn.js'
import { useClickOutside } from '../../../hooks/useClickOutside.js'

/**
 * Modal — accessible dialog rendered over an overlay.
 *
 * Closes on overlay click and Escape key. Renders nothing when `isOpen` is
 * false. The consumer controls open state.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Called when the user dismisses the modal.
 * @param {import('react').ReactNode} [props.title] - Optional heading.
 * @param {import('react').ReactNode} [props.footer] - Optional footer (actions).
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Max width preset.
 * @param {import('react').ReactNode} props.children - Modal body.
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element|null}
 */
export function Modal({
  isOpen,
  onClose,
  title,
  footer,
  size = 'md',
  children,
  className,
  ...rest
}) {
  const panelRef = useClickOutside(() => onClose?.(), isOpen)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className={cn(
          'w-full rounded-xl bg-surface shadow-2xl',
          sizes[size],
          className
        )}
        {...rest}
      >
        {title && (
          <div className="border-b border-neutral-200 px-6 py-4 text-lg font-semibold text-text-primary">
            {title}
          </div>
        )}
        <div className="px-6 py-5 text-text-secondary">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-neutral-200 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
