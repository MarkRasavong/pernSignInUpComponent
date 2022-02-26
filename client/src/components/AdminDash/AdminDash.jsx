import React, { useEffect, useState } from 'react';
import PortalApi from '../../apis/PortalApi';
import useTable from '../../components/Tbl/useTable';
import useStyles from './styles';
import { Avatar, Grid, InputAdornment, Paper, TableBody, TableCell, TableRow, Toolbar, Typography } from '@mui/material';
import PortalInput from '../PortalInput/PortalInput';
import SearchIcon from '@mui/icons-material/Search';
import EditModal from '../EditModal/EditModal';

const headCells = [
  { id: 'fullName', label: 'Full Name'},
  { id: 'email', label: 'Email'},
  { id: 'autoritzacio', label: 'Role(s)'},
  { id: 'edit', label: 'Modify', disableSorting: true}
];

const AdminDash = () => {
  const classes = useStyles();
  const [ users, setUsers ] = useState([]);
  const [filterFn, setFilterFn] = useState({ fn: items => {return items}});
  const { TblContainer, TblHead, 
    TblPagination, recordsAfterPagingAndSorting } = useTable(users, headCells, filterFn);
  const isUser = process.env.REACT_APP_CODIGO_USARIO;

  //FETCING USERS API
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

  //SEARCH FUNCTIONALITY
  const handleSearch = e => {
    let targetValue = e.target.value;
    setFilterFn({
      fn: items => {
        if(targetValue === '')
        return items;
        else
        return items.filter(x => x.email.includes(targetValue));
      }
    })
  }

  return (
    <Paper>
      <Toolbar>
        <PortalInput 
          label='Search by Email'
          className={classes.searchInput}
          InputProps={{
            startAdornment:(<InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>)
          }}
          onChange={handleSearch}
        />
      </Toolbar>
      <TblContainer>
        <TblHead />
        <TableBody>
        { recordsAfterPagingAndSorting().map(user => {
          let fullName = `${user.first_name} ${user.last_name}`
          return (
            <TableRow
            key={user.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar alt={`${user.first_name}_${user.last_name}`} src='.' className={classes.avatar}/>
                  </Grid>
                  <Grid item lg={10}>
                    {fullName}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">
                <Typography 
                  className={classes.role} 
                  style={{
                    backgroundColor: (( user.autoritzacio !== isUser && 'gold'))
                }}>
                  {isUser === user.autoritzacio ? 'USER' : 'ADMIN'}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <EditModal 
                userId={user.id} 
                auth={user.autoritzacio}
                email={user.email} 
                fName={user.first_name} 
                lName={user.last_name} 
                />
              </TableCell>
            </TableRow>
          )})}
          </TableBody>
      </TblContainer>
      <TblPagination />
    </Paper>
  )
}

export default AdminDash;