import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from './Breadcrumb'

const ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Button' },
]

describe('Breadcrumb', () => {
  it('renders a labeled nav', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument()
  })

  it('links non-final items and marks the last as current', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    const current = screen.getByText('Button')
    expect(current).toHaveAttribute('aria-current', 'page')
  })

  it('renders nothing when empty', () => {
    const { container } = render(<Breadcrumb items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
