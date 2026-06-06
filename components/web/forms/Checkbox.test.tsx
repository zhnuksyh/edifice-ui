import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders a labeled checkbox', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('reflects the checked prop', () => {
    render(<Checkbox label="On" checked readOnly />)
    expect(screen.getByLabelText('On')).toBeChecked()
  })

  it('fires onChange when toggled', () => {
    const onChange = vi.fn()
    render(<Checkbox label="Toggle" onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Toggle'))
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('sets the indeterminate property on the input', () => {
    render(<Checkbox label="Mixed" indeterminate />)
    expect((screen.getByLabelText('Mixed') as HTMLInputElement).indeterminate).toBe(true)
  })

  it('shows an error message', () => {
    render(<Checkbox label="X" error="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
