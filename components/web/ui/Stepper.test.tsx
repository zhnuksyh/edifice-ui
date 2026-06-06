import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stepper } from './Stepper'

const STEPS = [
  { id: '1', label: 'Account' },
  { id: '2', label: 'Profile' },
  { id: '3', label: 'Done' },
]

describe('Stepper', () => {
  it('renders every step label', () => {
    render(<Stepper steps={STEPS} current={1} />)
    STEPS.forEach((s) => expect(screen.getByText(s.label as string)).toBeInTheDocument())
  })

  it('shows numbers for upcoming steps and a check for completed ones', () => {
    const { container } = render(<Stepper steps={STEPS} current={1} />)
    // Step 0 is complete → rendered as a check svg, not the digit "1".
    expect(screen.queryByText('1')).not.toBeInTheDocument()
    // Current (step 2) and upcoming (step 3) show their numbers.
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders nothing when there are no steps', () => {
    const { container } = render(<Stepper steps={[]} current={0} />)
    expect(container).toBeEmptyDOMElement()
  })
})
