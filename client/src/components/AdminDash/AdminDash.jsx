import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import PortalApi from '../../apis/PortalApi';

const columns = [
  { field: 'id', headerName: 'ID', width: 130 },
  { field: 'first_name', headerName: 'First Name', width: 130 },
  { field: 'last_name', headerName: 'Last Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'password',
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

const AdminDash = () => {
  const [ users, setUsers ] = useState([]);

  const getUsers = async () => {
    await PortalApi.get("/users")
      .then( res => {
        setUsers(res.data.data);
      })
      .catch( err => {
        console.log(err.message);
      })
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default AdminDash;