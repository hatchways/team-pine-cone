import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Notification from "./Notification";
import { useProfileContext } from "../contexts/profile";

const useStyles = makeStyles({
  notification: {
    width: "95%",
    padding: "0px 20px",
  },
  emptyText: {
    fontStyle: "italic",
    fontSize: 10,
  },
});

function MyNotifications(props) {
  const classes = useStyles();
  const {profile} = useProfileContext();
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <h2>Notifications</h2>
      </Grid>
      <Grid className={classes.notification} item>
        {profile && profile.notifications.map(notification => (
          <Notification {...notification} />
        ))}
      </Grid>
      <Grid item>
        <p className={classes.emptyText}>Looks like you're all caught up!</p>
      </Grid>
    </Grid>
  );
}

export default MyNotifications;
