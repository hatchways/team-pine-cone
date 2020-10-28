import React from 'react';
import { Avatar, Card, Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  notification: {
    width: "95%",
    padding: "0px 20px",
  },
  notificationText: {
    textDecoration: "none",
  },
});

function Notification(props) {
    const classes = useStyles()
    return (
      <Link className={classes.notificationText} to="/my-jobs">
        <Card className={classes.notification} variant="outlined">
          <Grid container direction="row" alignItems="center">
            <Grid style={{ marginRight: 20 }} item>
              <Avatar />
            </Grid>
            <Grid item>
              <h3>Title</h3>
              <p>Description</p>
            </Grid>
          </Grid>
        </Card>
      </Link>
    );
}

export default Notification;