import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Toggle } from './Toggle'

describe('Toggle', () => {
  it('renders a switch reflecting checked state', () => {
    render(<Toggle checked onChange={() => {}} label="Notifications" />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange with the next state', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} label="N" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not fire when disabled', () => {
    const onChange = vi.fn()
    render(<Toggle checked={false} onChange={onChange} disabled label="N" />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
