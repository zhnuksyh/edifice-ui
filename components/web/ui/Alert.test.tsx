import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders title and body', () => {
    render(
      <Alert title="Heads up">Something happened</Alert>
    )
    expect(screen.getByText('Heads up')).toBeInTheDocument()
    expect(screen.getByText('Something happened')).toBeInTheDocument()
  })

  it('defaults to the soft treatment for its variant', () => {
    const { container } = render(<Alert variant="success">ok</Alert>)
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveClass('bg-success-tint')
  })

  it('renders a dismiss button that calls onDismiss', () => {
    const onDismiss = vi.fn()
    render(
      <Alert onDismiss={onDismiss}>dismiss me</Alert>
    )
    screen.getByRole('button').click()
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('omits the dismiss button when onDismiss is not given', () => {
    render(<Alert>no dismiss</Alert>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
