import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { AiFillLock } from 'react-icons/ai';
import useStyles from './authorization.module';
import Input from './Input';

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Authorization = () => {
  const classes = useStyles();

  const [ form, setForm ] = useState(initialState);
  const [ isSignedUp, setIsSignedUp ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
  };

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <AiFillLock />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignedUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <React.Fragment>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/> 
                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
              </React.Fragment>
            )}
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} />
            { isSignedUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button className={classes.submit} color="primary" variant="contained" fullWidth type="submit">{ isSignedUp ? "Sign Up" : "Sign In"}</Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp ? "Already have an account? Sign In" : "Dont't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
};

export default Authorization;
