import { useState } from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../components/web/ui/Table'
import { DataTable } from '../../../components/web/ui/DataTable'
import type { DataTableColumn } from '../../../components/web/ui/DataTable'
import { Badge } from '../../../components/web/ui/Badge'
import type { BadgeVariant } from '../../../components/web/ui/Badge'
import { Showcase } from '../components/Showcase'

interface User {
  id: number
  name: string
  role: string
  status: 'active' | 'invited' | 'suspended'
  seats: number
}

const USERS: User[] = [
  { id: 1, name: 'Ada Lovelace', role: 'Owner', status: 'active', seats: 12 },
  { id: 2, name: 'Grace Hopper', role: 'Admin', status: 'active', seats: 8 },
  { id: 3, name: 'Alan Turing', role: 'Member', status: 'invited', seats: 1 },
  { id: 4, name: 'Katherine Johnson', role: 'Member', status: 'suspended', seats: 3 },
]

const STATUS_VARIANT: Record<User['status'], BadgeVariant> = {
  active: 'success',
  invited: 'info',
  suspended: 'danger',
}

const COLUMNS: DataTableColumn<User>[] = [
  { key: 'name', header: 'Name', accessor: (r) => r.name, sortable: true, sortValue: (r) => r.name },
  { key: 'role', header: 'Role', accessor: (r) => r.role, sortable: true, sortValue: (r) => r.role },
  {
    key: 'status',
    header: 'Status',
    accessor: (r) => r.status,
    cell: (r) => <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>,
    sortable: true,
    sortValue: (r) => r.status,
  },
  {
    key: 'seats',
    header: 'Seats',
    accessor: (r) => r.seats,
    sortable: true,
    sortValue: (r) => r.seats,
    align: 'right',
  },
]

/** Table primitives and the config-driven DataTable. */
export function DataSection() {
  const [selectedId, setSelectedId] = useState<number | null>(2)

  return (
    <div>
      <Showcase
        title="DataTable"
        source="components/web/ui/DataTable.tsx"
        description="Config-driven table — click a sortable header to cycle asc → desc → off. Rows are clickable; status uses a custom cell renderer."
      >
        <DataTable
          columns={COLUMNS}
          data={USERS}
          rowKey={(r) => r.id}
          onRowClick={(r) => setSelectedId(r.id)}
          isRowSelected={(r) => r.id === selectedId}
        />
      </Showcase>

      <Showcase
        title="DataTable — empty"
        source="components/web/ui/DataTable.tsx"
        description="Empty state when there's no data."
      >
        <DataTable
          columns={COLUMNS}
          data={[]}
          rowKey={(r) => r.id}
          emptyState="No team members yet."
        />
      </Showcase>

      <Showcase
        title="Table (primitives)"
        source="components/web/ui/Table.tsx"
        description="Low-level building blocks for full markup control."
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead align="right">Seats</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell align="right">{u.seats}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Showcase>
    </div>
  )
}
