import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Tabs } from './Tabs'

const ITEMS = [
  { value: 'one', label: 'One', content: 'Panel one' },
  { value: 'two', label: 'Two', content: 'Panel two' },
  { value: 'three', label: 'Three', content: 'Panel three', disabled: true },
]

describe('Tabs', () => {
  it('shows the first panel by default', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByText('Panel one')).toBeInTheDocument()
    expect(screen.queryByText('Panel two')).not.toBeInTheDocument()
  })

  it('switches panels on tab click', () => {
    render(<Tabs items={ITEMS} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }))
    expect(screen.getByText('Panel two')).toBeInTheDocument()
  })

  it('marks the active tab selected', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true')
  })

  it('disables a disabled tab', () => {
    render(<Tabs items={ITEMS} />)
    expect(screen.getByRole('tab', { name: 'Three' })).toBeDisabled()
  })

  it('calls onValueChange when controlled', () => {
    const onValueChange = vi.fn()
    render(<Tabs items={ITEMS} value="one" onValueChange={onValueChange} />)
    fireEvent.click(screen.getByRole('tab', { name: 'Two' }))
    expect(onValueChange).toHaveBeenCalledWith('two')
  })
})
