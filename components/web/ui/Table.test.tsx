import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table'

function Sample({ styleVariant }: { styleVariant?: 'lined' | 'striped' | 'bordered' }) {
  return (
    <Table styleVariant={styleVariant}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Ada</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

describe('Table', () => {
  it('renders a table with header and cell content', () => {
    render(<Sample />)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument()
  })

  it('bordered treatment puts borders on cells (via context)', () => {
    render(<Sample styleVariant="bordered" />)
    expect(screen.getByRole('cell', { name: 'Ada' })).toHaveClass('border')
  })

  it('lined treatment (default) does not border cells', () => {
    render(<Sample styleVariant="lined" />)
    expect(screen.getByRole('cell', { name: 'Ada' })).not.toHaveClass('border')
  })
})
