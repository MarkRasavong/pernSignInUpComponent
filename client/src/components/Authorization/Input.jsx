import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Input = ({ name, label, half, autoFocus, type, handleShowPassword, minCharLength }) => {
  const { register,
    formState: { errors }
  } = useFormContext();

  return <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
    name={name}
    error={!!errors[name]}
    helperText={errors[name]?.message ?? ''}
    {...register(name, { required: true, minLength: {value: minCharLength, message: `min length is ${minCharLength}`}})}
    variant="outlined"
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
};

export default Input;
