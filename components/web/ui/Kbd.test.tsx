import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Kbd } from './Kbd'

describe('Kbd', () => {
  it('renders its key label', () => {
    render(<Kbd>K</Kbd>)
    expect(screen.getByText('K')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(<Kbd className="custom-x">K</Kbd>)
    expect(screen.getByText('K')).toHaveClass('custom-x')
  })
})
