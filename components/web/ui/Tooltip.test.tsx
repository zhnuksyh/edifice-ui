import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('is hidden until hovered', () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows on mouse enter and hides on leave', () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>
    )
    const wrapper = screen.getByText('Trigger').parentElement as HTMLElement
    fireEvent.mouseEnter(wrapper)
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help')
    fireEvent.mouseLeave(wrapper)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows on focus (keyboard accessible)', () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>
    )
    const wrapper = screen.getByText('Trigger').parentElement as HTMLElement
    fireEvent.focus(wrapper)
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
  })
})
