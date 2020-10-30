import React from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core/";
import Label from "./Label";

import { useStyles } from "./index";

const Select = function ({ label, id, value, handle, items }) {
  const classes = useStyles();

  return (
    <Grid container item className={classes.input}>
      <Grid item xs={4} md={3}>
        <Label id={id}>{label}</Label>
      </Grid>
      <Grid item xs={8} md={5}>
        <TextField
          id={id}
          name={id}
          value={value}
          onChange={handle}
          select
          className={classes.select}
          variant="outlined"
        >
          {items.map((value) => (
            <MenuItem value={value} key={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default Select;
