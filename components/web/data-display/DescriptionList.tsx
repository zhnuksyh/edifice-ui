import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export type DescriptionListLayout = 'row' | 'stacked'

export interface DescriptionItem {
  /** Stable key. */
  id: string
  /** The field label. */
  term: ReactNode
  /** The field value. */
  description: ReactNode
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  /** Key/value pairs to render. */
  items: DescriptionItem[]
  /**
   * 'row' puts term and description side by side; 'stacked' puts the
   * description below the term. Defaults to 'row'.
   */
  layout?: DescriptionListLayout
  /** Draw a hairline divider between rows. Defaults to true. */
  divided?: boolean
}

/**
 * DescriptionList — key/value pairs for detail and summary views.
 *
 * Use for record details, settings summaries, and metadata panels. 'row'
 * layout aligns terms and values in two columns; 'stacked' stacks them.
 */
export function DescriptionList({
  items,
  layout = 'row',
  divided = true,
  className,
  ...rest
}: DescriptionListProps) {
  if (items.length === 0) return null

  return (
    <dl
      className={cn(divided && 'divide-y divide-grey-2A', className)}
      {...rest}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'py-3 first:pt-0 last:pb-0',
            layout === 'row' ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-1'
          )}
        >
          <dt className="text-sm font-medium text-text-secondary">{item.term}</dt>
          <dd
            className={cn(
              'text-sm text-text-primary',
              layout === 'row' && 'col-span-2'
            )}
          >
            {item.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}
