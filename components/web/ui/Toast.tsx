import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info'

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tone. Defaults to 'info'. */
  variant?: ToastVariant
  /** Optional bold heading. */
  title?: ReactNode
  /** Message body. */
  children: ReactNode
  /** Called on dismiss (manual or auto). */
  onClose?: () => void
  /** Auto-dismiss delay in ms; 0 disables. Defaults to 4000. */
  duration?: number
}

/**
 * Toast — transient notification message.
 *
 * Auto-dismisses after `duration` ms (set to 0 to disable). The consumer
 * controls mounting/visibility.
 */
export function Toast({
  variant = 'info',
  title,
  children,
  onClose,
  duration = 4000,
  className,
  ...rest
}: ToastProps) {
  useEffect(() => {
    if (!duration || !onClose) {
      return undefined
    }
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  // Elevated grey-22 surface with a single accent left edge (cleaner than a full
  // tint wash); the accent color also tints the title via text-* on the body.
  const variants: Record<ToastVariant, string> = {
    success: 'border-l-success text-success',
    warning: 'border-l-warning text-warning',
    danger: 'border-l-danger text-danger',
    info: 'border-l-info text-info',
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 rounded-lg border border-l-4 border-grey-2A bg-grey-22 p-4 shadow-xl',
        variants[variant],
        className
      )}
      {...rest}
    >
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm text-text-secondary">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="shrink-0 text-text-secondary transition-colors duration-fast hover:text-text-primary"
        >
          ✕
        </button>
      )}
    </div>
  )
}
