import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'

const ITEMS = [
  { id: '1', title: 'Created', time: '2 days ago' },
  { id: '2', title: 'Shipped', time: 'today', description: 'Released v1' },
]

describe('Timeline', () => {
  it('renders each event title, time, and description', () => {
    render(<Timeline items={ITEMS} />)
    expect(screen.getByText('Created')).toBeInTheDocument()
    expect(screen.getByText('2 days ago')).toBeInTheDocument()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
    expect(screen.getByText('Released v1')).toBeInTheDocument()
  })

  it('renders nothing when empty', () => {
    const { container } = render(<Timeline items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
