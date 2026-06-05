import { useEffect, type HTMLAttributes, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info'
export type ToastStyleVariant = 'soft' | 'solid' | 'outline'

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tone (hue). Defaults to 'info'. */
  variant?: ToastVariant
  /**
   * Visual treatment. Defaults to 'soft'.
   * - `soft` — elevated surface with a hue left-accent (the original look).
   * - `solid` — filled hue background with contrasting text.
   * - `outline` — elevated surface with a full hue border.
   */
  styleVariant?: ToastStyleVariant
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
  styleVariant = 'soft',
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

  // soft — elevated grey surface with a single hue left edge (the original).
  const soft: Record<ToastVariant, string> = {
    success: 'border border-l-4 border-grey-2A border-l-success bg-grey-22 text-success',
    warning: 'border border-l-4 border-grey-2A border-l-warning bg-grey-22 text-warning',
    danger: 'border border-l-4 border-grey-2A border-l-danger bg-grey-22 text-danger',
    info: 'border border-l-4 border-grey-2A border-l-info bg-grey-22 text-info',
  }

  // solid — filled hue background, contrasting text.
  const solid: Record<ToastVariant, string> = {
    success: 'bg-success text-text-inverse',
    warning: 'bg-warning text-text-inverse',
    danger: 'bg-danger text-text-inverse',
    info: 'bg-info text-text-inverse',
  }

  // outline — elevated surface with a full hue border.
  const outline: Record<ToastVariant, string> = {
    success: 'border border-success bg-grey-22 text-success',
    warning: 'border border-warning bg-grey-22 text-warning',
    danger: 'border border-danger bg-grey-22 text-danger',
    info: 'border border-info bg-grey-22 text-info',
  }

  const treatments: Record<ToastStyleVariant, Record<ToastVariant, string>> = {
    soft,
    solid,
    outline,
  }

  const isSolid = styleVariant === 'solid'
  const bodyText = isSolid ? 'text-current/90' : 'text-text-secondary'
  const dismissText = isSolid
    ? 'text-current/80 hover:text-current'
    : 'text-text-secondary hover:text-text-primary'

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 rounded-lg p-4 shadow-xl',
        treatments[styleVariant][variant],
        className
      )}
      {...rest}
    >
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn('text-sm', bodyText)}>{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className={cn(
            'shrink-0 transition-colors duration-fast',
            dismissText
          )}
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
