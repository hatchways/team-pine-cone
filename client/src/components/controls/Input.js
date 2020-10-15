import React from 'react';
import { TextField } from '@material-ui/core';

export default function Input(props) {

  const { autoComplete, name, id, label, value, onChange } = props;

  return (
    <TextField
      autoComplete={autoComplete}
      name={name}
      variant="outlined"
      required
      fullWidth
      id={id}
      label={label}
      value={value}
      onChange= {onChange}
      autoFocus
    />
  )
}
