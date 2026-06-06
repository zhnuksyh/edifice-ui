import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from './Spinner'

describe('Spinner', () => {
  it('exposes a status role with an accessible label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('honors a custom label', () => {
    render(<Spinner label="Saving" />)
    expect(screen.getByText('Saving')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(<Spinner className="custom-x" />)
    expect(screen.getByRole('status')).toHaveClass('custom-x')
  })
})
