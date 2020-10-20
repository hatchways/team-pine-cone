import "date-fns";
import { addHours } from "date-fns";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Grid, Avatar, Typography, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: "10px",
    maxWidth: "1500px",
    width: "95%",
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
  },
}));

//DELETE
const SD = [
  "https://www.equafleece.co.uk/public/uploads/products/dog-suit/dog-suit-10.jpg",
];

const ProfileDetails = function () {
  const [selectDropIn, setSelectDropIn] = useState(addHours(new Date(), 1));
  const [selectDropOff, setSelectDropOff] = useState(addHours(new Date(), 2));
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectDropIn, selectDropOff);
    //api call
  };

  return (
    <Grid className={classes.root} container>
      <Grid item md={7}>
        <Grid direction="column" container>
          <Grid item>
            <div className={classes.banner}></div>
          </Grid>
          <Grid item direction="column" container alignItems="center">
            <Grid item>
              <Avatar
                className={classes.avatar}
                src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-256.png"
                alt="User name"
              />
            </Grid>
            <Grid item>
              <Typography className={classes.name} variant="h4">
                Michael Braga
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.subtile} paragraph>
                Loving Cat Sitter
              </Typography>
            </Grid>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item>
                <RoomIcon fontSize="large" color="primary" />
              </Grid>
              <Grid item>
                <Typography className={classes.subtile}>
                  Toronto, Ontario
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.about}>
            <Grid item>
              <Typography className={classes.name} gutterBottom variant="h5">
                About me
              </Typography>
            </Grid>
            <Grid item className={classes.mb2}>
              <Typography paragraph gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit
                amet nulla facilisi morbi tempus. Tortor dignissim convallis
                aenean et tortor at. Odio euismod lacinia at quis risus sed
                vulputate odio. Venenatis tellus in metus vulputate eu. Duis
                convallis convallis tellus id interdum. Sapien eget mi proin
                sed. Risus nec feugiat in fermentum posuere urna. Dis parturient
                montes nascetur ridiculus mus mauris vitae ultricies. Semper
                risus in hendrerit gravida rutrum quisque non tellus orci.
                Faucibus et molestie ac feugiat sed. Cras semper auctor neque
                vitae tempus quam pellentesque.
              </Typography>
            </Grid>
            <Grid container>
              {[SD, SD, SD, SD].map((url, i) => (
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
              $14/hr
            </Typography>
          </Grid>
          <Grid item>
            <Rating value={4} name="read-only" readOnly />
          </Grid>
        </Grid>
        <Grid item className={classes.mb3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container alignItems="center" direction="column" spacing={2}>
              <Grid item xs={6}>
                <DateTimePicker
                  strictCompareDates
                  disablePast
                  fullWidth
                  value={selectDropIn}
                  onChange={setSelectDropIn}
                  label="Drop In"
                  inputVariant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  disablePast
                  strictCompareDates
                  fullWidth
                  value={selectDropOff}
                  onChange={setSelectDropOff}
                  label="Drop Off"
                  inputVariant="outlined"
                />
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
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
  );
};

export default ProfileDetails;
