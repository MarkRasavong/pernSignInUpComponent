import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({

  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  role: {
    fontWeight: 'bold',
    fontSize: '0.75',
    color: 'white',
    backgroundColor: 'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  },
  searchInput: {
    width: '75%'
  }
}));