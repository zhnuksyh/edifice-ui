import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Accordion } from './Accordion'

const ITEMS = [
  { id: 'a', title: 'First', content: 'First body' },
  { id: 'b', title: 'Second', content: 'Second body' },
]

describe('Accordion', () => {
  it('renders triggers for each item', () => {
    render(<Accordion items={ITEMS} />)
    expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Second' })).toBeInTheDocument()
  })

  it('expands a panel on click', () => {
    render(<Accordion items={ITEMS} />)
    const first = screen.getByRole('button', { name: 'First' })
    expect(first).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(first)
    expect(first).toHaveAttribute('aria-expanded', 'true')
  })

  it('single-open mode closes the previous panel', () => {
    render(<Accordion items={ITEMS} />)
    fireEvent.click(screen.getByRole('button', { name: 'First' }))
    fireEvent.click(screen.getByRole('button', { name: 'Second' }))
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('honors defaultOpen', () => {
    render(<Accordion items={ITEMS} defaultOpen="a" />)
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true')
  })
})
