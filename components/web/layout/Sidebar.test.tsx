import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Sidebar } from './Sidebar'

const GROUPS = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'home', label: 'Home', href: '/', active: true },
      { id: 'settings', label: 'Settings', onClick: vi.fn() },
    ],
  },
]

describe('Sidebar', () => {
  it('renders header, group label, and items', () => {
    render(<Sidebar header={<span>Brand</span>} groups={GROUPS} />)
    expect(screen.getByText('Brand')).toBeInTheDocument()
    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders href items as links', () => {
    render(<Sidebar groups={GROUPS} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
  })

  it('fires onClick for button items', () => {
    render(<Sidebar groups={GROUPS} />)
    fireEvent.click(screen.getByText('Settings'))
    expect(GROUPS[0].items[1].onClick).toHaveBeenCalledTimes(1)
  })
})
