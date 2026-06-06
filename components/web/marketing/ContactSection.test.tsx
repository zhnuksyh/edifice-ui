import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ContactSection } from './ContactSection'

describe('ContactSection', () => {
  it('renders a default title and submit button', () => {
    render(<ContactSection />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
  })

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = vi.fn()
    const { container } = render(
      <ContactSection onSubmit={onSubmit} submitLabel="Send" />
    )
    // jsdom doesn't implicitly submit a form on button click; fire it directly.
    fireEvent.submit(container.querySelector('form') as HTMLFormElement)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
