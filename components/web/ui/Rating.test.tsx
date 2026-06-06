import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Rating } from './Rating'

describe('Rating', () => {
  it('renders a read-only rating with an accessible label', () => {
    render(<Rating value={3} />)
    expect(screen.getByRole('img', { name: 'Rated 3 out of 5' })).toBeInTheDocument()
  })

  it('renders interactive star radios when onChange is given', () => {
    render(<Rating value={2} onChange={() => {}} />)
    expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(5)
  })

  it('calls onChange with the clicked star value', () => {
    const onChange = vi.fn()
    render(<Rating value={2} onChange={onChange} />)
    screen.getByRole('radio', { name: '4 stars' }).click()
    expect(onChange).toHaveBeenCalledWith(4)
  })

  it('is not interactive when readOnly even with onChange', () => {
    render(<Rating value={2} onChange={() => {}} readOnly />)
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument()
  })
})
