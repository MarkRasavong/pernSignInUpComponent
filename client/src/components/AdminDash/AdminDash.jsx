import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name', width: 130 },
  { field: 'lastName', headerName: 'Last Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'hashedPassword',
    headerName: 'Password',
    width: 130,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    description: 'This column has a value gettter and is not sortable',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  }
];

const rows = [
  { id: 1, lastName: "Rossi", firstName: 'Valentino', age: 42},
  { id: 2, lastName: 'Marquez', firstName: 'Marc', age: 29 }
]

const AdminDash = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default AdminDash;