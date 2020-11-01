import { Grid } from "@material-ui/core";
import React from "react";
import Calendar from "./Calendar";

function Availability() {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <h2>Availability</h2>
      </Grid>
      <Grid item>
        <Calendar />
      </Grid>
    </Grid>
  );
}

export default Availability;