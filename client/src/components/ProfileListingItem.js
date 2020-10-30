import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Grow, Avatar, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import RoomIcon from "@material-ui/icons/Room";

import { useStyle } from "../pages/ProfileListings";

const Item = function (props) {
  const {
    _id,
    photo,
    firstName,
    lastName,
    description,
    jobTitle,
    rating = 0,
    hourlyRate = "$14.25",
    address = "Toronto, Ontario",
  } = props;
  const classes = useStyle();
  const history = useHistory();

  // go to individual listing from here
  const handleClick = () => history.push(`/profiles/${_id}`);
	console.log(address)

  return (
    <Grid item xs={12} className={classes.card} onClick={handleClick}>
      <Grow in={true}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar} src={photo} alt={lastName} />
          </Grid>
          <Grid item>
            <Grid container alignItems="center" direction="column">
              {/*fullName*/}
              <Grid item id="fullName">
                <Typography cvariant="h5" className={classes.bold}>
                  {firstName + " " + lastName}
                </Typography>
              </Grid>
              {/*title*/}
              <Grid item id="title">
                <Typography variant="body1" className={classes.subtile}>
                  {jobTitle}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Rating value={rating} name="read-only" readOnly />
          </Grid>
          <Grid item id="shortDescription">
            {/*shortDescription*/}
            <Typography variant="body1" className={classes.description}>
              {description && description.length > 50
                ? description.slice(0, 50) + "..."
                : description}
            </Typography>
          </Grid>
          <Grid item className={classes.cardBottom}>
            <Grid container justify="space-around">
              <Grid item>
                <Grid container spacing={1}>
                  <Grid item>
                    <RoomIcon color="primary" />
                  </Grid>
                  {/*location*/}
                  <Grid item id="address">
                    <Typography className={classes.subtile}>
                      {address || "CA"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/*hourlyRate*/}
              <Grid item id="hourlyRate">
                <Typography variant="body1" className={classes.bold}>
                  ${hourlyRate}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default Item;
