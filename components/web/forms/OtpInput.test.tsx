import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { OtpInput } from './OtpInput'

describe('OtpInput', () => {
  it('renders one box per digit', () => {
    render(<OtpInput length={4} />)
    expect(screen.getAllByRole('textbox')).toHaveLength(4)
  })

  it('reports changes via onChange as digits are entered', () => {
    const onChange = vi.fn()
    render(<OtpInput length={4} onChange={onChange} />)
    const boxes = screen.getAllByRole('textbox')
    fireEvent.change(boxes[0], { target: { value: '1' } })
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('calls onComplete when all boxes are filled', () => {
    const onComplete = vi.fn()
    render(<OtpInput length={2} onComplete={onComplete} />)
    const boxes = screen.getAllByRole('textbox')
    fireEvent.change(boxes[0], { target: { value: '1' } })
    fireEvent.change(boxes[1], { target: { value: '2' } })
    expect(onComplete).toHaveBeenCalledWith('12')
  })
})
