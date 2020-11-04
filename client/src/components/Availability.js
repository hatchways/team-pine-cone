import { Grid, Card, makeStyles } from "@material-ui/core";
import React from "react";
import moment from "moment";
import { useProfileContext } from "../contexts/profile";
import Calendar from "./Calendar";

const useStyles = makeStyles(theme => ({
  card: {
    padding: 20,
    width: 150,
    margin: 10,
    textAlign: "center"
  },
  date: {
    color: theme.palette.primary.main
  }
}))

function Availability() {
  const { profile } = useProfileContext()
  const classes = useStyles()
  const availability = {}
  if (profile) {
    for (let range of profile.availability) {
      if (new Date(range.start) > new Date()) {
        let day = moment(range.start).format("MMM D, YYYY");
        let time = `${moment(range.start).format("H:mm")} - ${moment(range.end).format("H:mm")}`;
        if (availability[day]) {
          availability[day].push(time)
        }
        else {
          availability[day] = [time]
        }
      }
    }
  }
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <h2>Availability</h2>
      </Grid>
      <Grid item>
        <Calendar />
      </Grid>
      <Grid item>
        <h2>Your Upcoming Availability</h2>
      </Grid>
      <Grid item>
        <Grid container>
          {Object.keys(availability).map((key) => (
              <Card key={key} className={classes.card} variant="outlined">
                <h3 className={classes.date}>{key}</h3>
                {availability[key].map(time => (
                  <p>{time}</p>
                ))}
              </Card>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Availability;