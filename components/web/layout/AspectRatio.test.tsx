import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AspectRatio } from './AspectRatio'

describe('AspectRatio', () => {
  it('defaults to the video (16:9) ratio', () => {
    render(
      <AspectRatio>
        <img alt="x" />
      </AspectRatio>
    )
    expect(screen.getByAltText('x').parentElement).toHaveClass('aspect-video')
  })

  it('applies a chosen ratio preset', () => {
    render(
      <AspectRatio ratio="square">
        <img alt="x" />
      </AspectRatio>
    )
    expect(screen.getByAltText('x').parentElement).toHaveClass('aspect-square')
  })
})
