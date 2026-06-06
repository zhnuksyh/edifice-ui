import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navbar } from './Navbar'

const LINKS = [
  { label: 'Home', href: '/', active: true },
  { label: 'Docs', href: '/docs' },
]

describe('Navbar', () => {
  it('renders brand, links, and actions', () => {
    render(
      <Navbar
        brand={<span>Edifice</span>}
        links={LINKS}
        actions={<button>Sign in</button>}
      />
    )
    expect(screen.getByText('Edifice')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
  })

  it('marks the active link with aria-current', () => {
    render(<Navbar links={LINKS} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current')
  })
})
