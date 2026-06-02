import type { ReactNode } from 'react'

interface ShowcaseProps {
  title: string
  description?: string
  /** Source path in the library, shown as a hint. */
  source?: string
  children: ReactNode
}

/** A titled block wrapping one component's demos. */
export function Showcase({ title, description, source, children }: ShowcaseProps) {
  return (
    <section className="border-b border-neutral-200 py-10">
      <div className="mb-5">
        <div className="flex items-baseline gap-3">
          <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
          {source && (
            <code className="font-mono text-xs text-text-muted">{source}</code>
          )}
        </div>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}

interface RowProps {
  label?: string
  children: ReactNode
}

/** A labeled row of variant examples. */
export function Row({ label, children }: RowProps) {
  return (
    <div className="mb-4 last:mb-0">
      {label && (
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  )
}
