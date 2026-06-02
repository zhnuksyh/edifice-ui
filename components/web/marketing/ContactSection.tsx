import type { FormEvent, HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Input } from '../forms/Input'
import { Button } from '../ui/Button'

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
  className,
  ...rest
}: ContactSectionProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.(event)
  }

  return (
    <section className={cn('bg-surface py-24', className)} {...rest}>
      <div className="mx-auto grid max-w-screen-lg gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input name="name" label="Name" placeholder="Jane Doe" required />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="jane@example.com"
            required
          />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="text-sm font-medium text-text-primary"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              placeholder="How can we help?"
              className="w-full rounded-lg border border-neutral-300 bg-surface px-3 py-2 text-base text-text-primary placeholder:text-text-muted transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            />
          </div>
          <Button type="submit" fullWidth>
            {submitLabel}
          </Button>
        </form>
      </div>
    </section>
  )
}
