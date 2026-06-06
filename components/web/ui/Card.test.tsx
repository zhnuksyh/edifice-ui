import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
  it('renders body, header, and footer', () => {
    render(
      <Card header="Head" footer="Foot">
        Body
      </Card>
    )
    expect(screen.getByText('Head')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Foot')).toBeInTheDocument()
  })

  it('defaults to the elevated treatment (fill + border + shadow)', () => {
    const { container } = render(<Card>Body</Card>)
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveClass('bg-grey-1A')
    expect(root).toHaveClass('border')
    expect(root).toHaveClass('shadow-md')
  })

  it('ghost treatment drops fill and border', () => {
    const { container } = render(<Card styleVariant="ghost">Body</Card>)
    const root = container.firstElementChild as HTMLElement
    expect(root).toHaveClass('bg-transparent')
    expect(root).not.toHaveClass('border')
  })

  it('interactive adds a hover border brighten', () => {
    const { container } = render(<Card interactive>Body</Card>)
    expect(container.firstElementChild).toHaveClass('hover:border-grey-44')
  })
})
