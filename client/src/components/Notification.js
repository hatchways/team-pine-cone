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

function Notification({ title, description, link, src }) {
    const classes = useStyles()
    return (
      <Link className={classes.notificationText} to={link}>
        <Card className={classes.notification} variant="outlined">
          <Grid container direction="row" alignItems="center">
            <Grid style={{ marginRight: 20 }} item>
              <Avatar src={src} />
            </Grid>
            <Grid item>
              <h3>{title}</h3>
              <p>{description}</p>
            </Grid>
          </Grid>
        </Card>
      </Link>
    );
}

export default Notification;