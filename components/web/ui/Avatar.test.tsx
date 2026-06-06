import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarGroup } from './Avatar'

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    const { container } = render(<Avatar src="x.png" alt="Ada" />)
    const img = container.querySelector('img')
    expect(img).toHaveAttribute('src', 'x.png')
    expect(img).toHaveAttribute('alt', 'Ada')
  })

  it('shows initials derived from the name when no src', () => {
    render(<Avatar name="Ada Lovelace" />)
    expect(screen.getByText('AL')).toBeInTheDocument()
  })

  it('falls back to a placeholder when neither src nor name', () => {
    const { container } = render(<Avatar />)
    // No initials text; the lucide User glyph renders as an svg.
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})

describe('AvatarGroup', () => {
  it('shows a +N overflow chip past max', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="A B" />
        <Avatar name="C D" />
        <Avatar name="E F" />
        <Avatar name="G H" />
      </AvatarGroup>
    )
    expect(screen.getByText('+2')).toBeInTheDocument()
  })
})
