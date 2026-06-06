import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LogoCloud } from './LogoCloud'

const LOGOS = [
  { id: 'a', content: 'Acme', label: 'Acme' },
  { id: 'b', content: 'Globex', label: 'Globex' },
]

describe('LogoCloud', () => {
  it('renders the optional title and every logo', () => {
    render(<LogoCloud title="Trusted by" logos={LOGOS} />)
    expect(screen.getByText('Trusted by')).toBeInTheDocument()
    expect(screen.getByText('Acme')).toBeInTheDocument()
    expect(screen.getByText('Globex')).toBeInTheDocument()
  })
})
