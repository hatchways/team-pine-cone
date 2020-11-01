import React, { useState } from 'react';
import moment from 'moment';
import { IconButton, Grid, makeStyles, Card, Button } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { useProfileContext } from '../contexts/profile';

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

const getDefaultTimes = () => [
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
    const { profile, setProfile } = useProfileContext();
    const [availability, setAvailability] = useState(convertAvailabilityFromDatabase(profile.availability));
    const [activeDay, setActiveDay] = useState(null);
    const [year, setYear] = useState(Number(today.format("YYYY")));
    const [monthNumber, setMonthNumber] = useState(Number(today.format("M")));
    const months = useMonths(year);
    const {firstDay, month, lastDay} = months[monthNumber]
    let dayOfWeek = Number(moment(firstDay).format("d"));
    const days = getDaysArray();
    const [times, setTimes] = useState([...getDefaultTimes()]);
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
            setActiveDay(null)
            setMonthNumber(newMonth)
        }
    )
    const createTimeHandler = i => (
        () => {
            const newTimes = [...times];
            newTimes[i].available = !newTimes[i].available;
            if (activeDay) {
                const newAvail = availability;
                if (newAvail.hasOwnProperty(year)) {
                    if (newAvail[year].hasOwnProperty(month)) {
                        newAvail[year][month][activeDay] = newTimes;
                    }
                    else {
                        newAvail[year][month] = {
                            [activeDay]: newTimes
                        }
                    }
                }
                else {
                    newAvail[year] = {
                        [month]: {
                            [activeDay]: newTimes
                        }
                    }
                }
                setAvailability(newAvail);
            }
            setTimes(newTimes);
        }
    )
    const createDayHandler = day => (
        () => {
            if (availability[year] && availability[year][month] && availability[year][month][day]) {
                setTimes(availability[year][month][day]);
            }
            else {
                setTimes([...getDefaultTimes()]);
            }
            setActiveDay(day);
        }
    )
    const handleSaveAvailability = () => {
        const data = convertAvailabilityForDatabase(availability)
        const newProfile = {...profile}
        newProfile.availability = data
        setProfile(newProfile)
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProfile),
        };
        fetch(`/profile/${profile._id}`, options);
    }
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
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
                              <IconButton
                                onClick={createDayHandler(day)}
                                color={
                                  activeDay === day
                                    ? "primary"
                                    : availability[year] &&
                                      availability[year][month] &&
                                      availability[year][month][day]
                                    ? "secondary"
                                    : "default"
                                }
                                disabled={!day}
                                size="medium"
                              >
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
              <Grid
                container
                direction="column"
                alignItems="center"
                wrap="wrap"
              >
                {times.map(
                  (time, i) =>
                    i < times.length - 7 && (
                      <TimeButton
                        className={classes.button}
                        start={time.time}
                        end={times[i + 1].time}
                        handleClick={createTimeHandler(i)}
                        available={time.available}
                      />
                    )
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                container
                direction="column"
                alignItems="center"
                wrap="wrap"
              >
                {times.map(
                  (time, i) =>
                    i < times.length - 1 &&
                    i > 5 && (
                      <TimeButton
                        className={classes.button}
                        start={time.time}
                        end={times[i + 1].time}
                        handleClick={createTimeHandler(i)}
                        available={time.available}
                      />
                    )
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSaveAvailability}
            className={classes.button}
          >
            Save Availability
          </Button>
        </Grid>
      </Grid>
    );
}

export default Calendar;

function TimeButton({className, start, end, available, handleClick}) {
    return (
    <Button onClick={handleClick} color={available ? "primary" : "default"} className={className} variant={available ? "contained" : "outlined"}>
        {start} - {end}
    </Button>
    );
}

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

const convertAvailabilityFromDatabase = availability => {
    const output = {}
    for (let range of availability) {
        let start = moment(range.start)
        let startTime = `${start.format("H")}:${start.format("mm")}`
        let end = moment(range.end)
        let endTime = `${end.format("H")}:${end.format("mm")}`;
        let year = Number(start.format("YYYY"))
        let month = start.format("MMMM")
        let day = Number(start.format("D"))
        if (output.hasOwnProperty(year)) {
            if (output[year].hasOwnProperty(month)) {
                if (!output[year][month].hasOwnProperty(day)) {
                    output[year][month][day] = getDefaultTimes()
                }
            }
            else {
                output[year][month] = {
                        [day]: getDefaultTimes()
                    }
                }
            }
        else {
            output[year] = {
              [month]: {
                [day]: getDefaultTimes(),
              },
            };
        }
        let i = 0
        while (output[year][month][day][i].time !== startTime) i++
        while (output[year][month][day][i].time !== endTime) {
            output[year][month][day][i].available = true;
            i++
        }
    }
    return output;
}


const convertAvailabilityForDatabase = availability => {
    const output = []
    for (let year in availability) {
        for (let month in availability[year]) {
            for (let day in availability[year][month]) {
                let activeDay = availability[year][month][day]
                let activeRangeStart = null;
                for (let time of activeDay) {
                    if (time.available && !activeRangeStart) activeRangeStart = time.time
                    else if (!time.available && activeRangeStart) {
                        output.push({
                          start: new Date(
                            `${month} ${day} ${year} ${activeRangeStart}`
                          ),
                          end: new Date(
                            `${month} ${day} ${year} ${time.time}`
                          ),
                        });
                        activeRangeStart = null;
                    }
                }
            }
        }
    }
    return output
}
