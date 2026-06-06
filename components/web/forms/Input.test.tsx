import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('associates the label with the input', () => {
    render(<Input label="Email" />)
    // getByLabelText resolves only when label/control are wired correctly.
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('defaults to the outline treatment (the original look)', () => {
    render(<Input label="Name" />)
    expect(screen.getByLabelText('Name')).toHaveClass('bg-grey-1A')
  })

  it('applies the filled treatment', () => {
    render(<Input label="Name" styleVariant="filled" />)
    expect(screen.getByLabelText('Name')).toHaveClass('bg-grey-22')
  })

  it('marks the field invalid and shows the error message', () => {
    render(<Input label="Email" error="Required" />)
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveClass('border-danger')
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('renders a clear button that calls onClear', () => {
    const onClear = vi.fn()
    render(
      <Input label="Search" value="hello" clearable onClear={onClear} readOnly />
    )
    screen.getByRole('button', { name: 'Clear' }).click()
    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('merges a custom className onto the input', () => {
    render(<Input label="X" className="custom-x" />)
    expect(screen.getByLabelText('X')).toHaveClass('custom-x')
  })
})
