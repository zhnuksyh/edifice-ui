import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders a single pulsing placeholder by default', () => {
    const { container } = render(<Skeleton />)
    const el = container.firstElementChild as HTMLElement
    expect(el).toHaveClass('animate-skeleton-pulse')
  })

  it('renders the requested number of lines', () => {
    const { container } = render(<Skeleton lines={3} />)
    // Wrapper holds N line divs.
    expect(container.firstElementChild?.children).toHaveLength(3)
  })

  it('applies a numeric width as px', () => {
    const { container } = render(<Skeleton variant="rect" width={120} height={40} />)
    const el = container.firstElementChild as HTMLElement
    expect(el.style.width).toBe('120px')
    expect(el.style.height).toBe('40px')
  })
})
