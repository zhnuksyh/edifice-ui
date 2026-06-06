import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NewsletterSignup } from './NewsletterSignup'

describe('NewsletterSignup', () => {
  it('renders heading and a labeled email field', () => {
    render(<NewsletterSignup title="Stay in the loop" />)
    expect(screen.getByText('Stay in the loop')).toBeInTheDocument()
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
  })

  it('calls onSubscribe with the entered email on submit', () => {
    const onSubscribe = vi.fn()
    const { container } = render(
      <NewsletterSignup onSubscribe={onSubscribe} buttonLabel="Join" />
    )
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'a@b.com' },
    })
    // jsdom doesn't implicitly submit on button click; fire the form submit.
    fireEvent.submit(container.querySelector('form') as HTMLFormElement)
    expect(onSubscribe).toHaveBeenCalledWith('a@b.com')
  })

  it('does not submit an empty email', () => {
    const onSubscribe = vi.fn()
    const { container } = render(
      <NewsletterSignup onSubscribe={onSubscribe} buttonLabel="Join" />
    )
    fireEvent.submit(container.querySelector('form') as HTMLFormElement)
    expect(onSubscribe).not.toHaveBeenCalled()
  })
})
