import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { AiFillLock } from 'react-icons/ai';
import useStyles from './authorization.module';
import { useForm, FormProvider } from 'react-hook-form';
import Input from './Input';
import { registerUser, logUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  const classes = useStyles();
  const nav = useNavigate();

  const [ isSignedUp, setIsSignedUp ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    methods.reset();
    setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    setShowPassword(false);
  };

  const onSubmit = async (data) => {

    if(!isSignedUp){
      await dispatch(logUser(data));
      nav("/user");
    } else {
      await dispatch(registerUser(data));
      nav("/user");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <AiFillLock />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignedUp ? "Sign Up" : "Sign In"}</Typography>
        <FormProvider {...methods}>
        <form className={classes.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {isSignedUp && (
              <React.Fragment>
                <Input name="first_name" label="First Name" autoFocus half minCharLength={2} /> 
                <Input name="last_name" label="Last Name" half minCharLength={2}/>
              </React.Fragment>
            )}
            <Grid item xs={12} sm={12}>
            <TextField
            error={!!methods.formState.errors["email"]}
            helperText={methods.formState.errors["email"]?.message ?? ''}
            {...methods.register("email",{required: true, pattern: {
              value: /^([a-z\d\.-_]+)+@(email\.com)$/,
              message: "Invalid email: must have the domain @email.com"
            }})}
            variant="outlined"
            fullWidth
            label="email"
            type="email"
            />
          </Grid>
            <Input name="password" label="Password" type={ showPassword ? "text" : "password" } handleShowPassword={handleShowPassword} minCharLength={5}/>
            { isSignedUp && <Input name="confirmPassword" label="Repeat Password" type="password" minCharLength={5} /> }
          </Grid>
          <Button className={classes.submit} color="primary" variant="contained" fullWidth type="submit" style={{marginTop: "10px"}}>{ isSignedUp ? "Sign Up" : "Sign In"}</Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignedUp ? "Already have an account? Sign In" : "Dont't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
        </FormProvider>
      </Paper>
    </Container>
  )
};

export default Authorization;