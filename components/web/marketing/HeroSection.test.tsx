import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renders eyebrow, title, subtitle, and actions', () => {
    render(
      <HeroSection
        eyebrow="New"
        title="Build faster"
        subtitle="A component library"
        actions={<button>Get started</button>}
      />
    )
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('Build faster')).toBeInTheDocument()
    expect(screen.getByText('A component library')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Get started' })).toBeInTheDocument()
  })

  it('renders the media slot in split-image layout', () => {
    render(
      <HeroSection title="T" media={<img alt="hero" />} styleVariant="split-image" />
    )
    expect(screen.getByAltText('hero')).toBeInTheDocument()
  })
})
