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

  const variants: Record<ToastVariant, string> = {
    success: 'border-success bg-success-tint text-success',
    warning: 'border-warning bg-warning-tint text-warning',
    danger: 'border-danger bg-danger-tint text-danger',
    info: 'border-info bg-info-tint text-info',
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 rounded-lg border-l-4 bg-surface p-4 shadow-lg',
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
