import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable, type DataTableColumn } from './DataTable'

interface Row {
  id: number
  name: string
  age: number
}

const DATA: Row[] = [
  { id: 1, name: 'Ada', age: 36 },
  { id: 2, name: 'Grace', age: 40 },
]

const COLUMNS: DataTableColumn<Row>[] = [
  { key: 'name', header: 'Name', accessor: (r) => r.name, sortable: true, sortValue: (r) => r.name },
  { key: 'age', header: 'Age', accessor: (r) => r.age, sortable: true, sortValue: (r) => r.age },
]

describe('DataTable', () => {
  it('renders headers and rows', () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowKey={(r) => r.id} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Ada')).toBeInTheDocument()
    expect(screen.getByText('Grace')).toBeInTheDocument()
  })

  it('shows the empty state when there is no data', () => {
    render(
      <DataTable
        columns={COLUMNS}
        data={[]}
        rowKey={(r) => r.id}
        emptyState="No rows"
      />
    )
    expect(screen.getByText('No rows')).toBeInTheDocument()
  })

  it('sorts when a sortable header is clicked', () => {
    render(<DataTable columns={COLUMNS} data={DATA} rowKey={(r) => r.id} />)
    // Default order: Ada, Grace. Sort by age desc → click Age twice (asc, desc).
    fireEvent.click(screen.getByRole('button', { name: /Age/ }))
    fireEvent.click(screen.getByRole('button', { name: /Age/ }))
    const cells = screen.getAllByRole('cell').map((c) => c.textContent)
    // First data cell after desc sort should belong to Grace (age 40).
    expect(cells[0]).toBe('Grace')
  })

  it('fires onRowClick', () => {
    const onRowClick = vi.fn()
    render(
      <DataTable
        columns={COLUMNS}
        data={DATA}
        rowKey={(r) => r.id}
        onRowClick={onRowClick}
      />
    )
    fireEvent.click(screen.getByText('Ada'))
    expect(onRowClick).toHaveBeenCalledWith(DATA[0])
  })
})
