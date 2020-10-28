import React from "react";
import { Avatar, Card, Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  emptyText: {
    fontStyle: "italic",
    fontSize: 10,
  },
  notification: {
    width: "95%",
    padding: "0px 20px",
  },
  notificationText: {
    textDecoration: "none",
  },
});

function MyNotifications(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <h2>Notifications</h2>
      </Grid>
      <Grid className={classes.notification} item>
        <Link className={classes.notificationText} to="/my-jobs">
          <Card className={classes.notification} variant="outlined">
            <Grid container direction="row" alignItems="center">
              <Grid style={{marginRight: 20}} item>
                <Avatar />
              </Grid>
              <Grid item>
                <h3>Title</h3>
                <p>Description</p>
              </Grid>
            </Grid>
          </Card>
        </Link>
      </Grid>
      <Grid item>
        <p className={classes.emptyText}>Looks like you're all caught up!</p>
      </Grid>
    </Grid>
  );
}

export default MyNotifications;
