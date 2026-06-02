import { useEffect } from 'react'
import { cn } from '../../../utils/cn.js'

/**
 * Toast — transient notification message.
 *
 * Auto-dismisses after `duration` ms (set to 0 to disable). The consumer
 * controls mounting/visibility.
 *
 * @param {Object} props
 * @param {('success'|'warning'|'danger'|'info')} [props.variant='info'] - Tone.
 * @param {import('react').ReactNode} [props.title] - Optional bold heading.
 * @param {import('react').ReactNode} props.children - Message body.
 * @param {() => void} [props.onClose] - Called on dismiss (manual or auto).
 * @param {number} [props.duration=4000] - Auto-dismiss delay in ms; 0 disables.
 * @param {string} [props.className] - Extra classes merged via cn().
 * @returns {JSX.Element}
 */
export function Toast({
  variant = 'info',
  title,
  children,
  onClose,
  duration = 4000,
  className,
  ...rest
}) {
  useEffect(() => {
    if (!duration || !onClose) {
      return undefined
    }
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const variants = {
    success: 'border-success bg-success-light/30 text-success-dark',
    warning: 'border-warning bg-warning-light/30 text-warning-dark',
    danger: 'border-danger bg-danger-light/30 text-danger-dark',
    info: 'border-info bg-info-light/30 text-info-dark',
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
          className="shrink-0 text-text-muted transition-colors duration-fast hover:text-text-primary"
        >
          ✕
        </button>
      )}
    </div>
  )
}
