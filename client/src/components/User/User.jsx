import { Grid, AppBar, Box, Button, IconButton, Toolbar, Typography, Container } from '@mui/material';
import MenuIcon from '@mui/material/IconButton';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';

const NavBar = () => (
  <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static">
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        User Portal
      </Typography>
      {/*<Button color="inherit">Login</Button>*/}
    </Toolbar>
  </AppBar>
</Box>
)

const User = () => {
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("profile")));
  const { first_name, last_name, user_id } = user?.data;
  const dispatch = useDispatch();
  const nav = useNavigate();


  const logoutClick = () => {
    dispatch({ type: LOGOUT });
    nav("/");
    setUser(null);
  }

  return(
    <React.Fragment>
      <NavBar />
      <Container>
        <Grid container="true" spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '30vh' }}>
          <Grid xs={12}>
            <Typography>Hello {first_name} {last_name},</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Your ID is: { user_id }</Typography>
          </Grid>
          <Grid xs={12}>
            <Button sx={{ marginTop: "10px" }} variant="outlined" color="secondary" onClick={logoutClick}>Sign Out</Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
};

export default User;
