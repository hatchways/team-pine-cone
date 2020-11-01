import { Grid, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useProfileContext } from "../contexts/profile";
import Calendar from "./Calendar";

const useStyles = makeStyles(theme => ({
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    color: theme.palette.primary.light,
    padding: 10,
    [theme.breakpoints.between("xs", "sm")]: {
      flexDirection: "column"
    }
  },
  label: {
    margin: "0px 25px",
    fontWeight: 700,
    [theme.breakpoints.between("xs", "sm")]: {
      margin: 25
    }
  },
  date: {
    padding: 5
  }
}));

function Availability() {
  const classes = useStyles();
  const { profile, setProfile } = useProfileContext();
  const [availability, setAvailability] = useState((profile && profile.availability) || []);
  const createChangeHandler = (i, key) => {
    return e => {
      const newAvail = [...availability];
      newAvail[i][key] = e;
      if (newAvail[i].end < newAvail[i].start) {
        newAvail[i].end = newAvail[i].start;
      }
      updateAvailability(newAvail);
    };
  };
  const updateAvailability = newAvail => {
    const newProfile = { ...profile };
    newProfile.availability = newAvail;
    setAvailability(newAvail);
    setProfile(newProfile);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    };
    fetch(`/profile/${profile._id}`, options);
  };
  const addRange = () => {
    const newAvail = [...availability];
    newAvail.push({
      start: new Date(),
      end: new Date()
    });
    updateAvailability(newAvail);
  };
  const createDeleteHandler = i => {
    return () => {
      const newAvail = [...availability];
      newAvail.splice(i, 1);
      updateAvailability(newAvail);
    };
  };
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