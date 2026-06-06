import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Progress } from './Progress'

describe('Progress', () => {
  it('exposes determinate progressbar values', () => {
    render(<Progress value={40} max={100} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '40')
    expect(bar).toHaveAttribute('aria-valuemax', '100')
  })

  it('omits value attributes when indeterminate', () => {
    render(<Progress />)
    const bar = screen.getByRole('progressbar')
    expect(bar).not.toHaveAttribute('aria-valuenow')
  })

  it('clamps the fill width to 100%', () => {
    render(<Progress value={150} max={100} />)
    const fill = screen.getByRole('progressbar').firstElementChild as HTMLElement
    expect(fill.style.width).toBe('100%')
  })
})
