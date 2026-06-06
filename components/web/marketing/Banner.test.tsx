import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Banner } from './Banner'

describe('Banner', () => {
  it('renders its message and action', () => {
    render(<Banner action={<a href="/x">Learn more</a>}>Launch week!</Banner>)
    expect(screen.getByText('Launch week!')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Learn more' })).toBeInTheDocument()
  })

  it('shows a dismiss button only when onDismiss is given', () => {
    const { rerender } = render(<Banner>Notice</Banner>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const onDismiss = vi.fn()
    rerender(<Banner onDismiss={onDismiss}>Notice</Banner>)
    screen.getByRole('button').click()
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })
})
