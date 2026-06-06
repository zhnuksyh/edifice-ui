import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageShell } from './PageShell'

describe('PageShell', () => {
  it('renders navbar, main content, and footer', () => {
    render(
      <PageShell navbar={<nav>Nav</nav>} footer={<footer>Foot</footer>}>
        Body
      </PageShell>
    )
    expect(screen.getByText('Nav')).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Body')
    expect(screen.getByText('Foot')).toBeInTheDocument()
  })

  it('constrains main when contained', () => {
    render(<PageShell>Body</PageShell>)
    expect(screen.getByRole('main')).toHaveClass('max-w-screen-xl')
  })

  it('does not constrain main when contained is false', () => {
    render(<PageShell contained={false}>Body</PageShell>)
    expect(screen.getByRole('main')).not.toHaveClass('max-w-screen-xl')
  })
})
