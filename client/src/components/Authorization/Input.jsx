import React from 'react';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
    name={name}
    variant="outlined"
    onChange={handleChange}
    required
    fullWidth
    label={label}
    autoFocus={autoFocus}
    type={type}
    InputProps={name === "password" ? {
      endAdornment : (
        <InputAdornment position="end">
          <IconButton onClick={handleShowPassword}>
            { type === "password" ? <MdVisibility /> : <MdVisibilityOff />}
          </IconButton>
        </InputAdornment>
      )
    }: null }
    />
  </Grid>
);

export default Input;
