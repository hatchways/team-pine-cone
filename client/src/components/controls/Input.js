import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const { error = null, ...rest } = props;

  return (
    <TextField {...rest} {...(error && { error: true, helperText: error })} />
  );
}
