import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PricingTable, type PricingTier } from './PricingTable'

const onSelect = vi.fn()
const TIERS: PricingTier[] = [
  { name: 'Free', price: '$0', features: ['1 project'], cta: 'Start', onSelect },
  {
    name: 'Pro',
    price: '$19',
    period: '/mo',
    features: ['Unlimited'],
    cta: 'Upgrade',
    onSelect,
    highlighted: true,
  },
]

describe('PricingTable', () => {
  it('renders each tier with name, price, and features', () => {
    render(<PricingTable tiers={TIERS} />)
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Pro')).toBeInTheDocument()
    expect(screen.getByText('$19')).toBeInTheDocument()
    expect(screen.getByText('Unlimited')).toBeInTheDocument()
  })

  it('fires onSelect for a tier CTA', () => {
    onSelect.mockClear()
    render(<PricingTable tiers={TIERS} />)
    fireEvent.click(screen.getByRole('button', { name: 'Upgrade' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('marks the highlighted tier as Popular', () => {
    render(<PricingTable tiers={TIERS} />)
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })
})
