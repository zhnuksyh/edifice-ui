import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Radio, RadioGroup } from './Radio'

function Group({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <RadioGroup label="Plan" value={value} onChange={onChange}>
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
    </RadioGroup>
  )
}

describe('Radio / RadioGroup', () => {
  it('renders the options and reflects the selected value', () => {
    render(<Group value="starter" onChange={() => {}} />)
    expect(screen.getByLabelText('Starter')).toBeChecked()
    expect(screen.getByLabelText('Pro')).not.toBeChecked()
  })

  it('calls onChange with the chosen value', () => {
    const onChange = vi.fn()
    render(<Group value="starter" onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Pro'))
    expect(onChange).toHaveBeenCalledWith('pro')
  })

  it('shares the group name across radios', () => {
    render(<Group value="starter" onChange={() => {}} />)
    const starter = screen.getByLabelText('Starter') as HTMLInputElement
    const pro = screen.getByLabelText('Pro') as HTMLInputElement
    expect(starter.name).toBe(pro.name)
    expect(starter.name).not.toBe('')
  })
})
