import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core/";
import ProfileListingItem from "../components/ProfileListingItem";
import { useFetch } from '../hooks/useFetch';

const initUsers = [user, user, user, user, user, user, user, user];

export const useStyle = makeStyles((theme) => ({
  root: {
    flexWrap: "nowrap",
  },
  bold: {
    fontWeight: "bold",
  },
  card: {
    boxShadow: "0px 0px 26px -5px rgba(0,0,0,0.75)",
    padding: "1.5em",
    textAlign: "center",
    cursor: "pointer",
    background: "white",
  },
  cardBottom: {
    width: "100%",
  },
  avatar: {
    width: "150px",
    height: "150px",
  },
  title: {
    marginTop: "4em",
    marginBottom: "1em",
    fontWeight: "bold",
  },
  subtile: {
    color: theme.palette.grey[600],
    fontWeight: 500,
  },
  description: {
    fontWeight: 500,
  },
  cards: {
    padding: "2em",
    display: "grid",
    "grid-template-columns": "repeat(auto-fill, minmax(10rem, 20rem))",
    "justify-content": "center",
    "grid-gap": "5em",
  },
  button: {
    padding: "1.5em 3em",
  },
}));

const user = {
  src: "https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-256.png",
  firstName: "Michael",
  lastName: "Braga",
  rating: 4,
  shortDescription: "The best cat sitter, walker, talker, over nght hours",
  location: "Toronto, Ontario",
  hourlyRate: "14$/hr",
};

const ProfileListings = function () {
  const classes = useStyle();
	const [profiles] = useFetch({url: '/profile'});

  const handleClickMore = () => {
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography className={classes.title} variant="h3" align="center">
          Search Results
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.cards}>
          {profiles.map((props, i) => (
            <ProfileListingItem key={props.firstName + i} {...props} />
          ))}
        </div>
      </Grid>
      <Grid item style={{ margin: "2em auto" }}>
        <Button
          onClick={handleClickMore}
          className={classes.button}
          color="primary"
          size="large"
          variant="contained"
        >
          Show More
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProfileListings;
