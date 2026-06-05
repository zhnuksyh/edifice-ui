import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Accordion } from '../ui/Accordion'

export interface FAQItem {
  question: string
  answer: ReactNode
}

export type FAQStyleVariant = 'centered' | 'two-column'

export interface FAQSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading. Defaults to 'Frequently asked questions'. */
  title?: ReactNode
  /** Optional supporting line under the heading. */
  subtitle?: ReactNode
  /** The question/answer pairs. */
  items: FAQItem[]
  /** Allow multiple answers open at once. Defaults to false. */
  allowMultiple?: boolean
  /**
   * Visual layout style. Defaults to 'centered'.
   * - `centered` — centered heading above a single accordion column.
   * - `two-column` — heading/subtitle on the left, accordion on the right.
   */
  styleVariant?: FAQStyleVariant
}

/**
 * FAQSection — a titled list of expandable Q&A built on Accordion.
 */
export function FAQSection({
  title = 'Frequently asked questions',
  subtitle,
  items,
  allowMultiple = false,
  styleVariant = 'centered',
  className,
  ...rest
}: FAQSectionProps) {
  const accordionItems = items.map((item, i) => ({
    id: String(i),
    title: item.question,
    content: item.answer,
  }))

  const accordion = (
    <Accordion items={accordionItems} allowMultiple={allowMultiple} />
  )

  if (styleVariant === 'two-column') {
    return (
      <section className={cn('bg-background py-20', className)} {...rest}>
        <div className="mx-auto grid max-w-screen-lg gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-text-primary">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 max-w-xs text-text-secondary">{subtitle}</p>
            )}
          </div>
          {accordion}
        </div>
      </section>
    )
  }

  // centered (default).
  return (
    <section className={cn('bg-background py-20', className)} {...rest}>
      <div className="mx-auto max-w-screen-md px-6">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary">{title}</h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-text-secondary">{subtitle}</p>
          )}
        </div>
        {accordion}
      </div>
    </section>
  )
}
