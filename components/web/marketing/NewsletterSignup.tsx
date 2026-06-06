import {
  useState,
  type FormHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../ui/Button'

export type NewsletterStyleVariant = 'inline' | 'card' | 'split'

export interface NewsletterSignupProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, 'title' | 'onSubmit'> {
  /** Heading above the form. */
  title?: ReactNode
  /** Supporting line below the heading. */
  subtitle?: ReactNode
  /** Submit button label. Defaults to 'Subscribe'. */
  buttonLabel?: string
  /** Email input placeholder. Defaults to 'you@example.com'. */
  placeholder?: string
  /** Fine print below the form (e.g. privacy note). */
  note?: ReactNode
  /** Called with the entered email on submit. */
  onSubscribe?: (email: string) => void
  /**
   * Visual layout style. Defaults to 'inline'.
   * - `inline` — centered copy above an inline email + button.
   * - `card` — the same, wrapped in a bordered, elevated panel.
   * - `split` — copy on the left, form on the right (two columns).
   */
  styleVariant?: NewsletterStyleVariant
}

/**
 * NewsletterSignup — an email-capture block with heading and inline form.
 *
 * Manages the email field internally and calls `onSubscribe(email)` on submit.
 * Drop into marketing pages; pair with a real handler to wire up your provider.
 */
export function NewsletterSignup({
  title,
  subtitle,
  buttonLabel = 'Subscribe',
  placeholder = 'you@example.com',
  note,
  onSubscribe,
  styleVariant = 'inline',
  className,
  ...rest
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim()) onSubscribe?.(email.trim())
  }

  const split = styleVariant === 'split'

  const copy = (title || subtitle) && (
    <div className={cn(!split && 'text-center')}>
      {title && (
        <h2 className="text-2xl font-bold text-grey-F0 sm:text-3xl">{title}</h2>
      )}
      {subtitle && (
        <p className={cn('mt-3 text-grey-AA', !split && 'mx-auto max-w-md')}>
          {subtitle}
        </p>
      )}
    </div>
  )

  const form = (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex max-w-md flex-col gap-3 sm:flex-row',
        !split && 'mx-auto'
      )}
      {...rest}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={placeholder}
        aria-label="Email address"
        className="h-11 flex-1 rounded-lg border border-grey-2A bg-grey-1A px-4 text-sm text-grey-F0 placeholder:text-grey-66 transition-colors hover:border-grey-44 focus-visible:border-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11"
      />
      <Button type="submit">{buttonLabel}</Button>
    </form>
  )

  const finePrint = note && (
    <p className={cn('mt-3 text-xs text-grey-66', !split && 'text-center')}>
      {note}
    </p>
  )

  if (split) {
    return (
      <section className={cn('py-16', className)}>
        <div className="mx-auto grid max-w-screen-lg items-center gap-8 px-6 lg:grid-cols-2">
          {copy}
          <div>
            {form}
            {finePrint}
          </div>
        </div>
      </section>
    )
  }

  const inner = (
    <>
      {copy}
      <div className="mt-6">{form}</div>
      {finePrint}
    </>
  )

  return (
    <section className={cn('py-16', className)}>
      <div className="mx-auto max-w-screen-sm px-6">
        {styleVariant === 'card' ? (
          <div className="rounded-2xl border border-grey-2A bg-grey-1A p-8 shadow-sm">
            {inner}
          </div>
        ) : (
          inner
        )}
      </div>
    </section>
  )
}
