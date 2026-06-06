import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Select } from './Select'

const OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]

describe('Select', () => {
  it('renders the trigger with a placeholder', () => {
    render(<Select label="Pick" placeholder="Choose…" options={OPTIONS} />)
    expect(screen.getByText('Choose…')).toBeInTheDocument()
  })

  it('opens the listbox and selects an option', () => {
    const onChange = vi.fn()
    render(<Select label="Pick" options={OPTIONS} onChange={onChange} />)
    fireEvent.click(screen.getByRole('combobox'))
    fireEvent.click(screen.getByText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('shows the selected option label', () => {
    render(<Select label="Pick" options={OPTIONS} value="a" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Alpha')
  })

  it('shows an error', () => {
    render(<Select label="Pick" options={OPTIONS} error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
