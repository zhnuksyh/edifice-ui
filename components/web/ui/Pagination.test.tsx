import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders nothing for a single page', () => {
    const { container } = render(
      <Pagination page={1} pageCount={1} onPageChange={() => {}} />
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn()
    render(<Pagination page={1} pageCount={5} onPageChange={onPageChange} />)
    screen.getByRole('button', { name: 'Page 3' }).click()
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('marks the current page', () => {
    render(<Pagination page={2} pageCount={5} onPageChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  })
})
