import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Grid } from './Grid'

describe('Grid', () => {
  it('renders a grid with the base column count', () => {
    render(<Grid cols={3}>c</Grid>)
    const el = screen.getByText('c')
    expect(el).toHaveClass('grid', 'grid-cols-3')
  })

  it('applies responsive column counts', () => {
    render(
      <Grid cols={1} smCols={2} lgCols={4}>
        c
      </Grid>
    )
    const el = screen.getByText('c')
    expect(el).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
  })
})
