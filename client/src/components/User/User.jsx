import { Grid, Button, Typography, Container } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';

const User = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { first_name, last_name, id} = user?.data;
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const logoutClick = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/"); 
  };

  return(
    <React.Fragment>
      <Container>
        <Grid container="true" spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '30vh' }}>
          <Grid xs={12}>
            <Typography>Hello {first_name} {last_name},</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Your ID is: { id }</Typography>
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
