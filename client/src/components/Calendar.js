import React from 'react';
import moment from 'moment';
import { IconButton, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    calendarText: {
        margin: 0,
        width: 25,
        height: 25,
        textAlign: "center"
    }
})

function Calendar({firstDay}) {
    const classes = useStyles();
    const month = moment(firstDay).format("MMMM");
    let dayOfWeek = Number(moment(firstDay).format("d"));
    console.log(dayOfWeek)
    const days = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];
    let week = 0;
    let dayOfMonth = 1;
    console.log(days)
    while (week < 6) {
        days[week][dayOfWeek] = dayOfMonth;
        dayOfMonth++;
        dayOfWeek++;
        if (dayOfWeek === 7) {
            week++
            dayOfWeek = 0
        }
    }
    return (
      <Grid container direction="column" alignItems="center">
        <h2>{month}</h2>
        {days.map((week) => (
        <Grid item>
            <Grid container direction="row">
            {week.map((day) => (
                <Grid item>
                <IconButton size="medium">
                    <p className={classes.calendarText}>{day}</p>
                </IconButton>
                </Grid>
            ))}
            </Grid>
        </Grid>
        ))}
      </Grid>
    );
}

export default Calendar;