import { Grid, AppBar, Box, Button, IconButton, Toolbar, Typography, Container } from '@mui/material';
import MenuIcon from '@mui/material/IconButton';
import React from 'react';

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
  return(
    <React.Fragment>
      <NavBar />
      <Container>
        <Grid container="true" spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '30vh' }}>
          <Grid xs={12}>
            <Typography>Hello First and Last Name,</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Your ID is: number goes here</Typography>
          </Grid>
          <Grid xs={12}>
            <Button sx={{ marginTop: "10px" }} variant="outlined" color="secondary">Sign Out</Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
};

export default User;
