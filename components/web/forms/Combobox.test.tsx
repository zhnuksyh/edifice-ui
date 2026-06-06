import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Combobox } from './Combobox'

const OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
]

describe('Combobox', () => {
  it('renders a search input', () => {
    render(<Combobox label="Country" options={OPTIONS} placeholder="Search…" />)
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument()
  })

  it('filters options as the user types and selects one', () => {
    const onChange = vi.fn()
    render(<Combobox label="Country" options={OPTIONS} onChange={onChange} />)
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'Ger' } })
    expect(screen.getByText('Germany')).toBeInTheDocument()
    expect(screen.queryByText('United States')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Germany'))
    expect(onChange).toHaveBeenCalledWith('de')
  })

  it('shows the empty message when nothing matches', () => {
    render(
      <Combobox label="Country" options={OPTIONS} emptyMessage="No results" />
    )
    const input = screen.getByRole('combobox')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'zzz' } })
    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
