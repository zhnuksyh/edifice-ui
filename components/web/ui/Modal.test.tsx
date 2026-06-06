import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Modal } from './Modal'

function noop() {}

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal isOpen={false} onClose={noop}>
        Body
      </Modal>
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a dialog with title and body when open', () => {
    render(
      <Modal isOpen onClose={noop} title="Confirm">
        Are you sure?
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByText('Confirm')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <Modal isOpen onClose={onClose}>
        Body
      </Modal>
    )
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('applies the fullscreen treatment', () => {
    render(
      <Modal isOpen onClose={noop} styleVariant="fullscreen" className="panel-x">
        Body
      </Modal>
    )
    expect(screen.getByText('Body').closest('.panel-x')).toHaveClass('rounded-none')
  })
})
