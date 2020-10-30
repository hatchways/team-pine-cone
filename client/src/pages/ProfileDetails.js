import React, { useState } from "react";
import { Grid, Avatar, Typography, Button, Grow } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import useScrollToTop from "../hooks/useScrollToTop";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Snackbar from "../components/DefaultSnackbar";
import Splash from "../components/Splash";
import DateTimePickerRanges from "../components/DateTimePickerRanges";

export const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: "10px",
    maxWidth: "1500px",
    width: "95%",
    background: "white",
    margin: "6em auto",
    [theme.breakpoints.up("md")]: {
      padding: "1.3em",
      boxShadow: "0px 0px 26px -5px rgba(0,0,0,0.75)",
    },
  },
  banner: {
    background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(223,27,27,1) 100%);`,
    width: "100%",
    height: "300px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  avatar: {
    width: "200px",
    height: "200px",
    marginTop: "-100px",
    marginBottom: theme.spacing(3),
    border: "white 8px solid",
  },
  name: {
    fontWeight: "bold",
  },
  about: {
    padding: "2em",
  },
  pet: {
    width: "90%",
    borderRadius: "10px",
  },
  dropInfo: {
    padding: "2em",
    marginTop: "4em",
    width: "100%",
  },
  mb2: {
    marginBottom: theme.spacing(3),
  },
  mb3: {
    marginBottom: theme.spacing(8),
  },
  subtile: {
    color: theme.palette.grey[600],
    fontWeight: "500",
  },
  para: {
    fontWeight: "400",
  },
  profile: {
    width: "100%",
  },
}));

const ProfileDetails = function () {
  const [selectDropIn, setSelectDropIn] = useState(null);
  const [selectDropOff, setSelectDropOff] = useState(null);
  const classes = useStyles();
  const params = useParams();
  const [profile, loading, error] = useFetch({
    init: {},
    url: `/profile/${params.id}`,
  });

  const {
    photo,
    firstName,
    lastName,
    description,
    images = [],
    hourlyRate = "$14.25",
    ratings = 0,
    location = {},
    availability,
  } = profile;
  const fullName = firstName ? firstName + " " + lastName : "";

  useScrollToTop();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectDropIn, selectDropOff);
    //api call
  };

  return (
    <Splash loading={loading}>
      <Grow in={true}>
        <Grid className={classes.root} container>
          <Snackbar open={error} />
          <Grid item md={7} className={classes.profile}>
            <Grid direction="column" container>
              <Grid item>
                <div className={classes.banner} />
              </Grid>
              <Grid item direction="column" container alignItems="center">
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    src={photo}
                    alt={fullName}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.name} variant="h4">
                    {fullName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    className={classes.subtile}
                    paragraph
                  >
                    Loving Dog Sitter
                  </Typography>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <RoomIcon fontSize="large" color="primary" />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.subtile}>
                      {/*TEMP*/}
                      {location.address || "Toronto, Ontario"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="column" className={classes.about}>
                <Grid item>
                  <Typography
                    className={classes.name}
                    gutterBottom
                    variant="h5"
                  >
                    About me
                  </Typography>
                </Grid>
                <Grid item className={classes.mb2}>
                  <Typography paragraph gutterBottom>
                    {description}
                  </Typography>
                </Grid>
                <Grid container>
                  {images.map((url, i) => (
                    <Grid item key={url + i} xs={6} sm={3}>
                      <img
                        className={classes.pet}
                        src={url}
                        alt={"Pet " + (i + 1)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*Drop Form*/}
          <Grid
            onSubmit={handleSubmit}
            component="form"
            className={classes.dropInfo}
            item
            md={5}
          >
            <Grid
              container
              className={classes.mb2}
              alignItems="center"
              direction="column"
            >
              <Grid item>
                <Typography paragraph variant="h4">
                  {hourlyRate}
                </Typography>
              </Grid>
              <Grid item>
                <Rating value={ratings} name="read-only" readOnly />
              </Grid>
            </Grid>
            <Grid item className={classes.mb3}>
              {!loading && (
                <DateTimePickerRanges
                  onChangeLeft={setSelectDropIn}
                  onChangeRight={setSelectDropOff}
                  leftValue={selectDropIn}
                  rightValue={selectDropOff}
                  labelLeft="Drop In"
                  labelRight="Drop Off"
                  ranges={availability}
                />
              )}
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                type="submit"
                color="primary"
                fullWidth
              >
                Send Request
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grow>
    </Splash>
  );
};

export default ProfileDetails;
