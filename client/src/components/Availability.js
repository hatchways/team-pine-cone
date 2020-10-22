import DateFnsUtils from '@date-io/date-fns';
import { Grid, Typography } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';

function Availability(props) {
    return (
      <Grid component="form" container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h2">Availability</Typography>
        </Grid>
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
          item
        >
          <Typography variant="p">Availability Range 1</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker label="Start" />
            <Typography variant="p">to</Typography>
            <DateTimePicker label="End" />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    );
}

export default Availability;