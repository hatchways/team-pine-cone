import { Link, Typography } from "@material-ui/core";
import React from "react";

function Copyright() {
  return (
    <Typography style={{marginTop: 20}} variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
          LovingSitter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;