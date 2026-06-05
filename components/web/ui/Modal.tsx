import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { useClickOutside } from '../../../hooks/useClickOutside'

export type ModalSize = 'sm' | 'md' | 'lg'
export type ModalStyleVariant = 'centered' | 'sheet' | 'fullscreen'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is visible. */
  isOpen: boolean
  /** Called when the user dismisses the modal. */
  onClose: () => void
  /** Optional heading. */
  title?: ReactNode
  /** Optional footer (actions). */
  footer?: ReactNode
  /** Max width preset (centered/sheet only). Defaults to 'md'. */
  size?: ModalSize
  /**
   * Position & shape. Defaults to 'centered'.
   * - `centered` — a panel centered in the viewport (the original look).
   * - `sheet` — a panel anchored to the bottom edge, full-width up to `size`.
   * - `fullscreen` — fills the viewport (ignores `size`).
   */
  styleVariant?: ModalStyleVariant
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
  styleVariant = 'centered',
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

  // Overlay alignment + padding, and panel shape/width, per treatment.
  const overlays: Record<ModalStyleVariant, string> = {
    centered: 'items-center justify-center p-4',
    sheet: 'items-end justify-center p-0 sm:p-4',
    fullscreen: 'items-stretch justify-stretch p-0',
  }

  const panels: Record<ModalStyleVariant, string> = {
    centered: cn('w-full rounded-xl border border-grey-2A', sizes[size]),
    sheet: cn(
      'w-full rounded-t-xl border border-grey-2A sm:rounded-xl',
      sizes[size]
    ),
    fullscreen: 'flex w-full flex-col rounded-none border-0',
  }

  return (
    <div
      className={cn('fixed inset-0 z-50 flex bg-overlay', overlays[styleVariant])}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={panelRef}
        className={cn(
          'bg-grey-22 shadow-2xl',
          panels[styleVariant],
          className
        )}
        {...rest}
      >
        {title && (
          <div className="px-6 pt-5 pb-2 text-lg font-semibold text-text-primary">
            {title}
          </div>
        )}
        <div
          className={cn(
            'px-6 py-3 text-text-secondary',
            styleVariant === 'fullscreen' && 'flex-1 overflow-y-auto'
          )}
        >
          {children}
        </div>
        {footer && (
          <div className="flex justify-end gap-3 px-6 pb-5 pt-2">{footer}</div>
        )}
      </div>
    </div>
  )
}
