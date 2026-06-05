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
export type AlertStyleVariant = 'soft' | 'solid' | 'outline'

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Tone (hue). Defaults to 'info'. */
  variant?: AlertVariant
  /**
   * Visual treatment. Defaults to 'soft'.
   * - `soft` — tinted surface with a hue left-accent (the original look).
   * - `solid` — filled hue background with contrasting text.
   * - `outline` — transparent with a full hue border.
   */
  styleVariant?: AlertStyleVariant
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
  styleVariant = 'soft',
  title,
  children,
  onDismiss,
  className,
  ...rest
}: AlertProps) {
  // soft — tinted surface + hue left-accent (the original look).
  const soft: Record<AlertVariant, string> = {
    info: 'border-l-4 border-info bg-info-tint text-info',
    success: 'border-l-4 border-success bg-success-tint text-success',
    warning: 'border-l-4 border-warning bg-warning-tint text-warning',
    danger: 'border-l-4 border-danger bg-danger-tint text-danger',
  }

  // solid — filled hue background, contrasting text.
  const solid: Record<AlertVariant, string> = {
    info: 'bg-info text-text-inverse',
    success: 'bg-success text-text-inverse',
    warning: 'bg-warning text-text-inverse',
    danger: 'bg-danger text-text-inverse',
  }

  // outline — transparent with a full hue border.
  const outline: Record<AlertVariant, string> = {
    info: 'border border-info text-info',
    success: 'border border-success text-success',
    warning: 'border border-warning text-warning',
    danger: 'border border-danger text-danger',
  }

  const treatments: Record<AlertStyleVariant, Record<AlertVariant, string>> = {
    soft,
    solid,
    outline,
  }

  const Icon = ICONS[variant]
  const isSolid = styleVariant === 'solid'
  // On a filled surface, body/dismiss text inherits the contrasting color.
  const bodyText = isSolid ? 'text-current/90' : 'text-text-secondary'
  const dismissText = isSolid
    ? 'text-current/80 hover:text-current'
    : 'text-text-secondary hover:text-text-primary'

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-lg p-4',
        treatments[styleVariant][variant],
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
        <div className={cn('text-sm', bodyText)}>{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
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
