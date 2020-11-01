import React, { useState } from 'react';
import moment from 'moment';
import { IconButton, Grid, makeStyles, Card, Button } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles({
    calendarText: {
        margin: 0,
        width: 25,
        height: 25,
        textAlign: "center"
    },
    button: {
        width: 200,
        margin: 10
    }
})

const useMonths = (year) => ({
  1: {
    lastDay: 31,
    month: "January",
    firstDay: moment(`01/01/${year}`),
  },
  2: {
    lastDay: year % 4 === 0 ? 29 : 28,
    month: "February",
    firstDay: moment(`02/01/${year}`),
  },
  3: {
    lastDay: 31,
    month: "March",
    firstDay: moment(`03/01/${year}`),
  },
  4: {
    lastDay: 30,
    month: "April",
    firstDay: moment(`04/01/${year}`),
  },
  5: {
    lastDay: 31,
    month: "May",
    firstDay: moment(`05/01/${year}`),
  },
  6: {
    lastDay: 30,
    month: "June",
    firstDay: moment(`06/01/${year}`),
  },
  7: {
    lastDay: 31,
    month: "July",
    firstDay: moment(`07/01/${year}`),
  },
  8: {
    lastDay: 31,
    month: "August",
    firstDay: moment(`08/01/${year}`),
  },
  9: {
    lastDay: 30,
    month: "September",
    firstDay: moment(`09/01/${year}`),
  },
  10: {
    lastDay: 31,
    month: "October",
    firstDay: moment(`10/01/${year}`),
  },
  11: {
    lastDay: 30,
    month: "November",
    firstDay: moment(`11/01/${year}`),
  },
  12: {
    lastDay: 31,
    month: "December",
    firstDay: moment(`12/01/${year}`),
  },
});

const defaultTimes = [
    {
        time: "8:00",
        available: false,
    },
    {
        time: "9:00",
        available: false,
    },
    {
        time: "10:00",
        available: false,
    },
    {
        time: "11:00",
        available: false,
    },
    {
        time: "12:00",
        available: false,
    },
    {
        time: "13:00",
        available: false,
    },
    {
        time: "14:00",
        available: false,
    },
    {
        time: "15:00",
        available: false,
    },
    {
        time: "16:00",
        available: false,
    },
    {
        time: "17:00",
        available: false,
    },
    {
        time: "18:00",
        available: false,
    },
    {
        time: "19:00",
        available: false,
    },
    {
        time: "20:00",
        available: false,
    },
];
function Calendar() {
    const classes = useStyles();
    const today = moment();
    const [year, setYear] = useState(Number(today.format("YYYY")));
    const [monthNumber, setMonthNumber] = useState(Number(today.format("M")));
    const months = useMonths(year);
    const {firstDay, month, lastDay} = months[monthNumber]
    let dayOfWeek = Number(moment(firstDay).format("d"));
    const days = getDaysArray();
    const [times, setTimes] = useState(defaultTimes);
    let week = 0;
    let dayOfMonth = 1;
    while (week < 6 && dayOfMonth <= lastDay) {
        days[week][dayOfWeek] = dayOfMonth;
        dayOfMonth++;
        dayOfWeek++;
        if (dayOfWeek === 7) {
            week++
            dayOfWeek = 0
        }
    }
    const createArrowHandler = delta => (
        () => {
            let newMonth = monthNumber + delta;
            if (newMonth > 12) {
                setYear(year + 1)
                newMonth = 1;
            }
            else if (newMonth < 1) {
                setYear(year - 1)
                newMonth = 12;
            }
            setMonthNumber(newMonth)
        }
    )
    return (
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <IconButton onClick={createArrowHandler(-1)}>
            <ArrowLeft />
          </IconButton>
        </Grid>
        <Grid item>
          <Card style={{ padding: 10, margin: 10 }} variant="outlined">
            <Grid container direction="column" alignItems="center">
              <h3>
                {month} {year}
              </h3>
              {days.map((week) => (
                <Grid item>
                  <Grid container direction="row">
                    {(week[0] || week[6]) &&
                      week.map((day) => (
                        <Grid item>
                          <IconButton disabled={!day} size="medium">
                            <p className={classes.calendarText}>{day}</p>
                          </IconButton>
                        </Grid>
                      ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
        <Grid item>
          <IconButton onClick={createArrowHandler(1)}>
            <ArrowRight />
          </IconButton>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" wrap="wrap">
            {times.map(
              (time, i) =>
                i < times.length - 7 && (
                  <Button className={classes.button} variant="outlined">
                    {time.time} - {times[i + 1].time}
                  </Button>
                )
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center" wrap="wrap">
            {times.map(
              (time, i) =>
                i < times.length - 1 && i > 5 && (
                  <Button className={classes.button} variant="outlined">
                    {time.time} - {times[i + 1].time}
                  </Button>
                )
            )}
          </Grid>
        </Grid>
      </Grid>
    );
}

export default Calendar;

function getDaysArray() {
    return [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ];
}
