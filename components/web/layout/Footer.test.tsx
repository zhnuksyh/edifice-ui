import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

const COLUMNS = [
  { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
  { title: 'Company', links: [{ label: 'About', href: '/about' }] },
]

describe('Footer', () => {
  it('renders brand and column links', () => {
    render(<Footer brand={<span>Edifice</span>} columns={COLUMNS} />)
    expect(screen.getByText('Edifice')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('shows a default copyright line', () => {
    render(<Footer />)
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })

  it('honors a custom bottom slot', () => {
    render(<Footer bottom={<span>Custom bottom</span>} />)
    expect(screen.getByText('Custom bottom')).toBeInTheDocument()
  })
})
