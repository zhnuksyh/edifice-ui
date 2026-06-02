import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tone. Defaults to 'info'. */
  variant?: AlertVariant
  /** Optional bold heading. */
  title?: ReactNode
  /** Message body. */
  children: ReactNode
  /** Show a dismiss button; called when clicked. */
  onDismiss?: () => void
}

const ICONS: Record<AlertVariant, ReactNode> = {
  info: <path d="M12 16v-4M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />,
  success: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />,
  warning: (
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01" />
  ),
  danger: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6M9 9l6 6" />,
}

/**
 * Alert — a persistent, in-page status message.
 *
 * Unlike Toast (transient), an Alert stays in the layout until removed. Use it
 * for form-level errors, banners, and contextual notices.
 */
export function Alert({
  variant = 'info',
  title,
  children,
  onDismiss,
  className,
  ...rest
}: AlertProps) {
  const variants: Record<AlertVariant, string> = {
    info: 'border-info bg-info-tint text-info',
    success: 'border-success bg-success-tint text-success',
    warning: 'border-warning bg-warning-tint text-warning',
    danger: 'border-danger bg-danger-tint text-danger',
  }

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg border-l-4 bg-surface p-4',
        variants[variant],
        className
      )}
      {...rest}
    >
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-5 w-5 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICONS[variant]}
      </svg>
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm text-text-secondary">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 text-text-secondary transition-colors duration-fast hover:text-text-primary"
        >
          ✕
        </button>
      )}
    </div>
  )
}
