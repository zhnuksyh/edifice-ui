import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from './Section'

describe('Section', () => {
  it('renders children inside a container by default', () => {
    render(<Section>content</Section>)
    const text = screen.getByText('content')
    expect(text).toBeInTheDocument()
    // contained → wrapped in a Container (mx-auto max-width element).
    expect(text.closest('.mx-auto')).not.toBeNull()
  })

  it('skips the container when contained is false', () => {
    render(<Section contained={false}>content</Section>)
    expect(screen.getByText('content').closest('.mx-auto')).toBeNull()
  })

  it('applies the surface tone', () => {
    const { container } = render(<Section tone="surface">c</Section>)
    expect(container.querySelector('section')).toHaveClass('bg-surface')
  })
})
