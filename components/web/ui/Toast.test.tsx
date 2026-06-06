import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Toast } from './Toast'

describe('Toast', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('renders title and body', () => {
    render(
      <Toast title="Saved" duration={0}>
        Your changes are saved
      </Toast>
    )
    expect(screen.getByText('Saved')).toBeInTheDocument()
    expect(screen.getByText('Your changes are saved')).toBeInTheDocument()
  })

  it('auto-dismisses after the duration', () => {
    const onClose = vi.fn()
    render(
      <Toast duration={4000} onClose={onClose}>
        Body
      </Toast>
    )
    expect(onClose).not.toHaveBeenCalled()
    act(() => vi.advanceTimersByTime(4000))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not auto-dismiss when duration is 0', () => {
    const onClose = vi.fn()
    render(
      <Toast duration={0} onClose={onClose}>
        Body
      </Toast>
    )
    act(() => vi.advanceTimersByTime(10000))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('dismisses on the close button', () => {
    const onClose = vi.fn()
    render(
      <Toast duration={0} onClose={onClose}>
        Body
      </Toast>
    )
    screen.getByRole('button').click()
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
