import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Popover } from './Popover'

describe('Popover', () => {
  it('is closed until the trigger is clicked', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Panel content</p>
      </Popover>
    )
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument()
  })

  it('opens on trigger click', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Panel content</p>
      </Popover>
    )
    fireEvent.click(screen.getByText('Open'))
    expect(screen.getByText('Panel content')).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Panel content</p>
      </Popover>
    )
    fireEvent.click(screen.getByText('Open'))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByText('Panel content')).not.toBeInTheDocument()
  })
})
