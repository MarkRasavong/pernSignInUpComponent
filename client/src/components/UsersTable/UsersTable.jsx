import React, { useEffect, useState } from 'react';
import PortalApi from '../../apis/PortalApi';
import {Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Button, 
  Paper,
  Avatar,
  Grid,
  Typography
} from '@mui/material';
import useStyles from './styles';
  

export default function UsersTable() {
  const [ users, setUsers ] = useState([]);
  const [page, setPage] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(5);

  const classes = useStyles();
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

  //PAGINATION LOGIC

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };


  return (
    <React.Fragment>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table aria-label="Users Table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Full Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Email</TableCell>
            <TableCell className={classes.tableHeaderCell}>Roles</TableCell>
            <TableCell className={classes.tableHeaderCell}>Modify</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Pagination Logic */}
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar alt={`${row.first_name}_${row.last_name}`} src='.' className={classes.avatar}/>
                  </Grid>
                  <Grid item lg={10}>
                    {`${row.first_name} ${row.last_name}`}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                <Typography 
                  className={classes.role} 
                  style={{
                    backgroundColor: (( row.autoritzacio !== isUser && 'gold'))
                }}>
                  {isUser === row.autoritzacio ? 'USER' : 'ADMIN'}
                </Typography>
              </TableCell>
              <TableCell align="left"><Button variant='contained'>Modify</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[ 5, 10, 15 ]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>
    </TableContainer>
    </React.Fragment>
  );
}