import type { FormEvent, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Input } from '../forms/Input'
import { Textarea } from '../forms/Textarea'
import { Button } from '../ui/Button'

export type ContactStyleVariant = 'split' | 'stacked' | 'card'

export interface ContactSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Heading. Defaults to 'Get in touch'. */
  title?: ReactNode
  /** Supporting paragraph. */
  subtitle?: ReactNode
  /** Submit handler; receives the native form event. */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  /** Submit button text. Defaults to 'Send message'. */
  submitLabel?: string
  /**
   * Visual layout style. Defaults to 'split'.
   * - `split` — intro copy left, form right (two columns).
   * - `stacked` — centered copy above a single-column form.
   * - `card` — centered copy above the form, wrapped in a bordered card.
   */
  styleVariant?: ContactStyleVariant
}

/**
 * ContactSection — marketing contact block with intro copy and a simple form.
 *
 * The form is uncontrolled; wire up submission via `onSubmit`, which receives
 * the native form event.
 */
export function ContactSection({
  title = 'Get in touch',
  subtitle,
  onSubmit,
  submitLabel = 'Send message',
  styleVariant = 'split',
  className,
  ...rest
}: ContactSectionProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(event)
  }

  const split = styleVariant === 'split'

  const heading = (
    <div className={cn(!split && 'text-center')}>
      <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed text-text-secondary',
            !split && 'mx-auto max-w-xl'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )

  const form = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input name="name" label="Name" placeholder="Jane Doe" required />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="jane@example.com"
        required
      />
      <Textarea
        id="contact-message"
        name="message"
        label="Message"
        rows={4}
        required
        placeholder="How can we help?"
      />
      <Button type="submit" fullWidth>
        {submitLabel}
      </Button>
    </form>
  )

  if (split) {
    return (
      <section className={cn('bg-surface py-24', className)} {...rest}>
        <div className="mx-auto grid max-w-screen-lg gap-12 px-6 lg:grid-cols-2">
          {heading}
          {form}
        </div>
      </section>
    )
  }

  // stacked + card share the centered single-column layout; card adds a panel.
  return (
    <section className={cn('bg-surface py-24', className)} {...rest}>
      <div className="mx-auto flex max-w-screen-sm flex-col gap-8 px-6">
        {heading}
        {styleVariant === 'card' ? (
          <div className="rounded-xl border border-grey-2A bg-grey-1A p-6 shadow-sm">
            {form}
          </div>
        ) : (
          form
        )}
      </div>
    </section>
  )
}
