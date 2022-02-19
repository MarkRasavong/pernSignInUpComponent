import { TextField } from '@mui/material'
import React from 'react'

export default function PortalInput(props){
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <TextField
      variant='outlined'
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...other}
      {...(error && { error:true, helperText: error })}
    />
  )
}