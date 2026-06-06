import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
/* state-mutating clicks use fireEvent so React flushes the re-render */
import { Menu, type MenuItem } from './Menu'

const onSelect = vi.fn()
const ITEMS: MenuItem[] = [
  { kind: 'label', label: 'Section' },
  { label: 'Profile', onSelect },
  { kind: 'separator' },
  { label: 'Delete', onSelect, danger: true },
  { label: 'Disabled', disabled: true },
]

describe('Menu', () => {
  it('is closed until the trigger is clicked', () => {
    render(<Menu trigger={<button>Open</button>} items={ITEMS} />)
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })

  it('opens and shows actions on trigger click', () => {
    render(<Menu trigger={<button>Open</button>} items={ITEMS} />)
    fireEvent.click(screen.getByText('Open'))
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('fires onSelect for an action', () => {
    onSelect.mockClear()
    render(<Menu trigger={<button>Open</button>} items={ITEMS} />)
    fireEvent.click(screen.getByText('Open'))
    fireEvent.click(screen.getByText('Profile'))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('closes on Escape', () => {
    render(<Menu trigger={<button>Open</button>} items={ITEMS} />)
    fireEvent.click(screen.getByText('Open'))
    const profile = screen.getByText('Profile')
    expect(profile).toBeInTheDocument()
    // Menu listens for Escape via onKeyDown on its wrapper (not document).
    fireEvent.keyDown(profile, { key: 'Escape' })
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
  })
})
