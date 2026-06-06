import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('defaults to the soft treatment (the original look)', () => {
    render(<Badge variant="primary">Soft</Badge>)
    expect(screen.getByText('Soft')).toHaveClass('bg-yellow-tint')
  })

  it('applies the solid treatment', () => {
    render(
      <Badge variant="primary" styleVariant="solid">
        Solid
      </Badge>
    )
    expect(screen.getByText('Solid')).toHaveClass('bg-yellow')
  })

  it('applies the outline treatment', () => {
    render(
      <Badge variant="danger" styleVariant="outline">
        Outline
      </Badge>
    )
    const badge = screen.getByText('Outline')
    // Outline uses a same-hue inset ring (crisper than a border on dark).
    expect(badge).toHaveClass('ring-danger')
    expect(badge).toHaveClass('text-danger')
  })

  it('renders a pill when requested', () => {
    render(<Badge pill>Pill</Badge>)
    expect(screen.getByText('Pill')).toHaveClass('rounded-full')
  })

  it('merges a custom className', () => {
    render(<Badge className="custom-x">X</Badge>)
    expect(screen.getByText('X')).toHaveClass('custom-x')
  })
})
