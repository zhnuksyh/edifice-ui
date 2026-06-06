import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('defaults to the primary look and keeps it when styleVariant is omitted', () => {
    render(<Button>Default</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-yellow')
  })

  it('applies a styleVariant treatment over the variant hue', () => {
    render(
      <Button variant="danger" styleVariant="outline">
        Delete
      </Button>
    )
    const btn = screen.getByRole('button')
    expect(btn).toHaveClass('border-danger')
    expect(btn).toHaveClass('text-danger')
  })

  it('disables and shows a busy state while loading', () => {
    render(<Button loading>Saving</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('fires onClick when enabled', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Go</Button>)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('merges a custom className', () => {
    render(<Button className="custom-x">X</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-x')
  })
})
