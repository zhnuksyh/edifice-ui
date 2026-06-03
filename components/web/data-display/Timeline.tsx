import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type TimelineTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger'

export interface TimelineItem {
  /** Stable key. */
  id: string
  /** Event heading. */
  title: ReactNode
  /** Optional timestamp / meta line. */
  time?: ReactNode
  /** Optional body content. */
  description?: ReactNode
  /** Dot tone. Defaults to 'neutral'. */
  tone?: TimelineTone
  /** Optional icon rendered inside the dot instead of a plain marker. */
  icon?: ReactNode
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  /** Ordered list of events, oldest or newest first (caller decides). */
  items: TimelineItem[]
}

/**
 * Timeline — a vertical sequence of events connected by a rail.
 *
 * Use for activity feeds, changelogs, and audit trails. Each item shows a
 * toned dot, a title, an optional timestamp, and optional body.
 */
export function Timeline({ items, className, ...rest }: TimelineProps) {
  const tones: Record<TimelineTone, string> = {
    neutral: 'bg-grey-44 border-grey-44',
    primary: 'bg-yellow border-yellow',
    success: 'bg-success border-success',
    warning: 'bg-warning border-warning',
    danger: 'bg-danger border-danger',
  }

  if (items.length === 0) return null

  return (
    <ol className={cn('relative', className)} {...rest}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        const tone = item.tone ?? 'neutral'
        return (
          <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                className="absolute left-[7px] top-4 h-full w-px bg-grey-2A"
                aria-hidden
              />
            )}
            <span
              className={cn(
                'relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
                item.icon ? 'bg-grey-22 border-grey-44 text-text-secondary' : tones[tone]
              )}
            >
              {item.icon}
            </span>
            <div className="-mt-0.5 min-w-0">
              <p className="font-medium text-text-primary">{item.title}</p>
              {item.time && (
                <p className="text-xs text-text-muted">{item.time}</p>
              )}
              {item.description && (
                <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
