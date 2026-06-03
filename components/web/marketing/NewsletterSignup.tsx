import {
  useState,
  type FormHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'
import { Button } from '../ui/Button'

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
  className,
  ...rest
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (email.trim()) onSubscribe?.(email.trim())
  }

  return (
    <section className={cn('py-16', className)}>
      <div className="mx-auto max-w-screen-sm px-6 text-center">
        {title && (
          <h2 className="text-2xl font-bold text-grey-F0 sm:text-3xl">{title}</h2>
        )}
        {subtitle && (
          <p className="mx-auto mt-3 max-w-md text-grey-AA">{subtitle}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          {...rest}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            aria-label="Email address"
            className="h-11 flex-1 rounded-lg border border-grey-2A bg-grey-1A px-4 text-sm text-grey-F0 placeholder:text-grey-66 transition-colors hover:border-grey-44 focus-visible:border-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-11"
          />
          <Button type="submit">{buttonLabel}</Button>
        </form>
        {note && (
          <p className="mt-3 text-xs text-grey-66">{note}</p>
        )}
      </div>
    </section>
  )
}
