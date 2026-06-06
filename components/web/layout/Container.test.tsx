import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container } from './Container'

describe('Container', () => {
  it('renders children with default xl max-width and padding', () => {
    render(<Container>content</Container>)
    const el = screen.getByText('content')
    expect(el).toHaveClass('max-w-screen-xl')
    expect(el).toHaveClass('mx-auto')
  })

  it('applies the chosen size', () => {
    render(<Container size="sm">c</Container>)
    expect(screen.getByText('c')).toHaveClass('max-w-screen-sm')
  })

  it('omits gutter padding when not padded', () => {
    render(<Container padded={false}>c</Container>)
    expect(screen.getByText('c')).not.toHaveClass('px-4')
  })
})
