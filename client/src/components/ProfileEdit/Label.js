import React from "react";
import { Typography } from "@material-ui/core/";

import { useStyles } from "./index";

const Label = function ({ children, id }) {
  const classes = useStyles();

  return (
    <Typography className={classes.label} component="label" htmlFor={id}>
      {children}
    </Typography>
  );
};

export default Label;
