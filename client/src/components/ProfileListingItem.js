import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Grow, Avatar, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import RoomIcon from "@material-ui/icons/Room";

import { useStyle } from "../pages/ProfileListings";

const Item = function (props) {
  const {
    src,
    firstName,
    lastName,
    shortDescription,
    rating,
    hourlyRate,
    location,
  } = props;
  const classes = useStyle();
  const history = useHistory();

  // go to individual listing from here
  const handleClick = () => history.push("/profiles/:id");

  return (
    <Grid item xs={12} className={classes.card} onClick={handleClick}>
      <Grow in={true}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid item>
            <Avatar className={classes.avatar} src={src} alt={lastName} />
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
                  Loving Cat Sitter
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
              {shortDescription}
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
                  <Grid item id="location">
                    <Typography className={classes.subtile}>
                      {location}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {/*hourlyRate*/}
              <Grid item id="hourlyRate">
                <Typography variant="body1" className={classes.bold}>
                  {hourlyRate}
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
