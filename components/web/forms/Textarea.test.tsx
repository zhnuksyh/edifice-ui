import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('associates the label with the textarea', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('defaults to the outline treatment', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toHaveClass('bg-surface')
  })

  it('applies the filled treatment', () => {
    render(<Textarea label="Message" styleVariant="filled" />)
    expect(screen.getByLabelText('Message')).toHaveClass('bg-grey-22')
  })

  it('shows the error and marks invalid', () => {
    render(<Textarea label="Message" error="Required" />)
    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
