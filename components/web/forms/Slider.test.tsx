import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Slider } from './Slider'

describe('Slider', () => {
  it('renders a labeled range input', () => {
    render(<Slider label="Volume" value={50} onChange={() => {}} />)
    const input = screen.getByRole('slider')
    expect(input).toHaveValue('50')
  })

  it('calls onChange with the numeric value', () => {
    const onChange = vi.fn()
    render(<Slider label="Volume" value={50} onChange={onChange} />)
    fireEvent.change(screen.getByRole('slider'), { target: { value: '75' } })
    expect(onChange).toHaveBeenCalledWith(75)
  })

  it('formats the displayed value', () => {
    render(
      <Slider label="Vol" value={60} onChange={() => {}} formatValue={(v) => `${v}%`} />
    )
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('honors min/max/step', () => {
    render(<Slider label="V" value={5} onChange={() => {}} min={0} max={10} step={2} />)
    const input = screen.getByRole('slider')
    expect(input).toHaveAttribute('min', '0')
    expect(input).toHaveAttribute('max', '10')
    expect(input).toHaveAttribute('step', '2')
  })
})
