import { Grid, Button, Typography, Container, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../../actions/user';
import { LOGOUT } from '../../constants/actionTypes';
import EditModal from '../EditModal/EditModal';

const User = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { first_name, last_name, id } = user?.data;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const fetchedUser = useSelector((state) => state.users.user);
  const isAdmin = process.env.REACT_APP_CODIGO_ADMIN;
  const userAuthStatus = user?.data?.autoritzacio;

  useEffect(() => {
    dispatch(fetchUserById(id, dispatch));
  }, [dispatch])

  const logoutClick = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/"); 
  };

  return(
    !fetchedUser ? <CircularProgress /> : (
    <React.Fragment>
      <Container>
        <Grid container="true" spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '30vh' }}>
          <Grid xs={12}>
            <Typography>Hello {first_name} {last_name},</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography>Your ID is: { id }</Typography>
          </Grid>
          <Grid xs={12} sx={{ marginTop: '10px' }}>
            { userAuthStatus === isAdmin &&
              <Button sx={{marginRight: '10px' }} variant="outlined" color="warning" onClick={() => navigate('/admin')}>Admin Dash</Button>
            }
            <EditModal userId={id} />
            <Button variant="outlined" color="secondary" onClick={logoutClick}>Sign Out</Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
    )
  )
};

export default User;
