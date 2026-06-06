import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stat } from './Stat'

describe('Stat', () => {
  it('renders label, value, delta, and hint', () => {
    render(
      <Stat label="Revenue" value="$48,200" delta="+12.5%" trend="up" hint="vs last month" />
    )
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$48,200')).toBeInTheDocument()
    expect(screen.getByText('+12.5%')).toBeInTheDocument()
    expect(screen.getByText('vs last month')).toBeInTheDocument()
  })

  it('defaults to the elevated surface treatment', () => {
    const { container } = render(<Stat label="X" value="1" />)
    expect(container.firstElementChild).toHaveClass('bg-grey-1A', 'border')
  })

  it('ghost treatment drops the framed box', () => {
    const { container } = render(<Stat label="X" value="1" styleVariant="ghost" />)
    expect(container.firstElementChild).not.toHaveClass('border')
  })
})
