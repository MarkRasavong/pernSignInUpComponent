import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

import useStyles from './styles';

const NavBar = () => {
    const [ user, setUser ] = useState(JSON.parse(sessionStorage.getItem('profile')));
    let location = useLocation();
    let navigate = useNavigate();
    const classes = useStyles();

    const logout = () => {
      navigate("/");
      sessionStorage.clear();
    }

    useEffect(() => {
      const token = user?.token;

      //check if token expires
      if(token) {
        const decodedToken = decode(token);

        //if token expiry * 1000 (ms) is lower then current time then logout
        if(decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(sessionStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static'>
            <Toolbar className={classes.toolbar}>
              {user?.data ? (
                <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user?.data.first_name} src={user?.data?.imageUrl}>{user?.data?.first_name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user?.data?.first_name} {user?.data?.last_name}</Typography>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Typography variant="h2">User Portal</Typography>
              )}
            </Toolbar>
        </AppBar>
    )

}

export default NavBar;