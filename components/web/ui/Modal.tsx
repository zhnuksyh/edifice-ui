import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is visible. */
  isOpen: boolean
  /** Called when the user dismisses the modal. */
  onClose: () => void
  /** Optional heading. */
  title?: ReactNode
  /** Optional footer (actions). */
  footer?: ReactNode
  /** Max width preset. Defaults to 'md'. */
  size?: ModalSize
  /** Modal body. */
  children: ReactNode
}

/**
 * Modal — accessible dialog rendered over an overlay.
 *
 * Closes on overlay click and Escape key. Renders nothing when `isOpen` is
 * false. The consumer controls open state.
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
}: ModalProps) {
  const panelRef = useClickOutside<HTMLDivElement>(() => onClose?.(), isOpen)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }
    const onKeyDown = (event: KeyboardEvent) => {
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

  const sizes: Record<ModalSize, string> = {
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
