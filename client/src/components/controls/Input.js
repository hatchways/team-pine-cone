import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {

  const { autoComplete, name, id, label, value, error=null, onChange, type } = props;

  return (
    <TextField
      autoComplete={autoComplete}
      name={name}
      id={id}
      label={label}
      value={value}
      onChange= {onChange}
      type={type}
      variant="outlined"
      fullWidth
      autoFocus
      {...(error && { error:true, helperText:error })}
    />
  )
}
