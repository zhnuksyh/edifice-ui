import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CTASection } from './CTASection'

describe('CTASection', () => {
  it('renders title, subtitle, and actions', () => {
    render(
      <CTASection
        title="Ready?"
        subtitle="Start today"
        actions={<button>Sign up</button>}
      />
    )
    expect(screen.getByText('Ready?')).toBeInTheDocument()
    expect(screen.getByText('Start today')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  })
})
