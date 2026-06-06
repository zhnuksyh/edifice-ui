import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Stack } from './Stack'

describe('Stack', () => {
  it('defaults to a column with md gap', () => {
    render(<Stack>c</Stack>)
    const el = screen.getByText('c')
    expect(el).toHaveClass('flex', 'flex-col', 'gap-4')
  })

  it('switches to a row and applies align/justify/wrap', () => {
    render(
      <Stack direction="row" align="center" justify="between" wrap>
        c
      </Stack>
    )
    const el = screen.getByText('c')
    expect(el).toHaveClass('flex-row', 'items-center', 'justify-between', 'flex-wrap')
  })
})
