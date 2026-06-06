import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Drawer } from './Drawer'

function noop() {}

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(
      <Drawer isOpen={false} onClose={noop}>
        Body
      </Drawer>
    )
    expect(screen.queryByText('Body')).not.toBeInTheDocument()
  })

  it('renders title and body when open', () => {
    render(
      <Drawer isOpen onClose={noop} title="Filters">
        Body
      </Drawer>
    )
    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('calls onClose on Escape', () => {
    const onClose = vi.fn()
    render(
      <Drawer isOpen onClose={onClose}>
        Body
      </Drawer>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
