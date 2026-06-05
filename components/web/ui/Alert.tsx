import type { ComponentType, HTMLAttributes, ReactNode } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
  type LucideProps,
} from 'lucide-react'
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

const ICONS: Record<AlertVariant, ComponentType<LucideProps>> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
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

  const Icon = ICONS[variant]

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
      <Icon
        className="mt-0.5 h-5 w-5 shrink-0"
        strokeWidth={2}
        aria-hidden="true"
      />
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
          <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
