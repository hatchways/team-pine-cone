import React from 'react';
import { Avatar, Card, Grid, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useProfileContext } from '../contexts/profile';

const useStyles = makeStyles({
  notification: {
    width: "95%",
    padding: "0px 20px",
    marginBottom: 20
  },
  notificationText: {
    textDecoration: "none",
  },
});

function Notification({ title, message, link, src, _id }) {
    const classes = useStyles()
    const {profile, pullProfile} = useProfileContext();
    const handleClick = () => {
      let index;
      profile.notifications.forEach((notification, i) => {
        if (notification._id === _id) index = i
      })
      profile.notifications.splice(index, 1)
      fetch(`/profile/${profile._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      }).then(() => {
        pullProfile()
      });
    }
    return (
      <Link onClick={handleClick} className={classes.notificationText} to={link}>
        <Card className={classes.notification} variant="outlined">
          <Grid container direction="row" alignItems="center">
            <Grid style={{ marginRight: 20 }} item>
              <Avatar src={src} />
            </Grid>
            <Grid item>
              <h3>{title}</h3>
              <p>{message}</p>
            </Grid>
          </Grid>
        </Card>
      </Link>
    );
}

export default Notification;
