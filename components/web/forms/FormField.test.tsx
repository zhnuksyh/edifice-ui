import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('wires the label, control id, and describedBy', () => {
    render(
      <FormField label="Email" hint="we never share it">
        {({ id, describedBy }) => (
          <input id={id} aria-describedby={describedBy} />
        )}
      </FormField>
    )
    const input = screen.getByLabelText('Email')
    expect(input).toBeInTheDocument()
    expect(screen.getByText('we never share it')).toBeInTheDocument()
  })

  it('shows an error and marks invalid via the render prop', () => {
    render(
      <FormField label="Email" error="Required">
        {({ id, describedBy, invalid }) => (
          <input id={id} aria-describedby={describedBy} aria-invalid={invalid} />
        )}
      </FormField>
    )
    expect(screen.getByText('Required')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })
})
