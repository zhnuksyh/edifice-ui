import type { HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../../utils/cn'

export type BannerTone = 'neutral' | 'accent' | 'info'
export type BannerStyleVariant = 'bar' | 'floating'

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Tone. Defaults to 'accent'. */
  tone?: BannerTone
  /** Optional leading icon. */
  icon?: ReactNode
  /** Optional inline action (e.g. a link or Button). */
  action?: ReactNode
  /** Called when the dismiss button is clicked; omit to hide it. */
  onDismiss?: () => void
  /**
   * Visual style. Defaults to 'bar'.
   * - `bar` — full-width edge-to-edge bar with a bottom hairline.
   * - `floating` — inset, rounded, self-contained pill with a full border.
   */
  styleVariant?: BannerStyleVariant
  /** Banner message. */
  children: ReactNode
}

/**
 * Banner — a full-width announcement bar, typically pinned at the top of a page.
 *
 * Use for launches, promos, and notices. Optionally dismissible and supports a
 * trailing action. Keep the copy short — one line.
 */
export function Banner({
  tone = 'accent',
  icon,
  action,
  onDismiss,
  styleVariant = 'bar',
  children,
  className,
  ...rest
}: BannerProps) {
  const tones: Record<BannerTone, string> = {
    neutral: 'bg-grey-1A text-grey-F0 border-grey-2A',
    accent: 'bg-yellow-tint text-yellow border-yellow/20',
    info: 'bg-info-tint text-info border-info/20',
  }

  // bar: edge-to-edge with a bottom hairline; floating: inset rounded pill.
  const shape =
    styleVariant === 'floating'
      ? 'mx-4 my-3 rounded-lg border shadow-sm'
      : 'border-b'

  return (
    <div
      role="region"
      aria-label="Announcement"
      className={cn(
        'flex items-center justify-center gap-3 px-4 py-2.5 text-sm',
        shape,
        tones[tone],
        className
      )}
      {...rest}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <p className="text-center font-medium">{children}</p>
      {action && <span className="shrink-0">{action}</span>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss announcement"
          className="ml-1 shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
