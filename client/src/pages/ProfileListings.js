import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core/";
import ProfileListingItem from "../components/ProfileListingItem";
import { useFetch } from "../hooks/useFetch";
import SnackBar from '../components/DefaultSnackbar';

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
    marginTop: "3em",
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

const ProfileListings = function () {
  const classes = useStyle();
  const [data, loading, error] = useFetch({ url: "/profile", init: { profiles: [] } });

  const sitters = useMemo(
    () => data.profiles.filter((profile) => profile.isSitter),
    [data]
  );

  const handleClickMore = () => {
    //need to add pagination
  };
	console.log(error)

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography className={classes.title} variant="h3" align="center">
          Search Results
        </Typography>
      </Grid>
      <Grid item>
        <div className={classes.cards}>
          {sitters.map((props, i) => (
            <ProfileListingItem key={props._id} {...props} />
          ))}
        </div>
      </Grid>
      <Grid item style={{ margin: "2em auto" }}>
        {!loading ? (
          <Button
            onClick={handleClickMore}
            className={classes.button}
            color="primary"
            size="large"
            variant="contained"
          >
            Show More
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default ProfileListings;
