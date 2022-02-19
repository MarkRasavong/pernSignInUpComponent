import {
  Table, TableHead, TableRow, TableCell,
  Typography,
  TablePagination,
  TableSortLabel
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 1250
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
})
)

//in another component you must include TableBody and mapping you own TabelCell&&TabelRow
export default function useTable(records, headCells, filterFn) {
  const classes = useStyles();
  //pagination
  const pages = [5, 10, 25]
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  //asc & desc sorting data
  const [order, setOrder] = useState(null);
  const [orderBy, setOrderBy] = useState(null);


  const TblHead = (props) => {

    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };

    return (<TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell key={headCell.id}
            className={classes.tableHeaderCell}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.disableSorting ? <Typography variant='button' color='white'>{headCell.label}</Typography>
              :
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => { handleSortRequest(headCell.id) }}
              >
                <Typography variant='button' color='white'>{headCell.label}</Typography>
              </TableSortLabel>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>)
  }

  const TblContainer = (props) => (
    <Table className={classes.table}>
      {props.children}
    </Table>
  );

  //PAGINATION LOGIC

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    //renders to the first page and shows records depending on number
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component='div'
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );

  //SORTING LOGIC
  function stableSort(arr, comparator) {
    const stablizedThis = arr.map((el, idx) => [el, idx]);
    stablizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stablizedThis.map((el) => el[0]);
  };


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage)
  }

  return { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting }
}
