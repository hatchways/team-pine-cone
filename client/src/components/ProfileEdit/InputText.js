import React from "react";
import { Grid, Typography, TextField } from "@material-ui/core/";

import { useStyles } from "./index";

const InputText = function ({
  id,
  placeholder,
  children,
  value,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <Grid container item className={classes.input}>
      <Grid item xs={4} md={3}>
        <Typography className={classes.label} component="label" htmlFor={id}>
          {children}
        </Typography>
      </Grid>
      <Grid item xs={8} md={7}>
        <TextField
          onChange={handleChange}
          id={id}
          name={id}
          fullWidth
          variant="outlined"
          value={value}
          placeholder={placeholder}
        />
      </Grid>
    </Grid>
  );
};

export default InputText;
