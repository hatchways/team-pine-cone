import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core/";
import PetsIcon from "@material-ui/icons/Pets";
import ProfileListingItem from "../components/ProfileListingItem";
import Snackbar from "../components/DefaultSnackbar";
import Splash from "../components/Splash";
import SearchFilter from "../components/SearchFilter";
import useForm from "../components/useForm";
import { useProfileContext } from "../contexts/profile";

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
  moreLoading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  paw: {
    width: "5em",
    height: "5em",
    marginTop: "2em",
  },
}));

const form = {
  rating: 0,
  hourlyRateRange: [0, 50],
  fromDate: null,
  toDate: null,
  page: 1,
  search: "",
  searchBy: "name",
};

const ProfileListings = function () {
  const classes = useStyle();
  const location = useLocation();
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const { values, handleInputChange, setValues, handleDateChange } = useForm(
    form
  );
  const [data, setData] = useState({ profiles: [] });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { profile } = useProfileContext();

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/profile?" + new URLSearchParams(location.search).toString())
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [location]);

  const { profiles: sitters = [], metadata } = data;

  const handleClickMore = () => {
    setValues({ ...values, page: values.page + 1 });
    setShowMoreLoading(true);

    let form = values;

    if (!values.fromDate || !values.toDate || values.fromDate > values.toDate) {
      const { fromDate, toDate, ...restForm } = form;
      form = restForm;
    } else {
      form.fromDate = new Date(form.fromDate).toISOString();
      form.toDate = new Date(form.toDate).toISOString();
    }

    form.page = form.page + 1;

    fetch("/profile?" + new URLSearchParams(form).toString())
      .then((res) => res.json())
      .then((newData) =>
        setData({
          ...newData,
          profiles: [...data.profiles, ...newData.profiles],
        })
      )
      .finally(() => setShowMoreLoading(false));
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <Typography className={classes.title} variant="h3" align="center">
          Search Results
        </Typography>
        <SearchFilter
          initForm={form}
          setData={setData}
          setValues={setValues}
          values={values}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
        />
        <Snackbar open={error} />
      </Grid>

      <Splash loading={loading}>
        {!loading && !error && sitters.length === 0 ? (
          <Grid container direction="column" alignItems="center">
            <PetsIcon
              fontSize="large"
              color="primary"
              className={classes.paw}
            />
            <Typography
              variant="h4"
              align="center"
              className={classes.description}
            >
              No Pet Sitters Available
            </Typography>
          </Grid>
        ) : null}
        <Grid item>
          <div className={classes.cards}>
            {sitters.map((props) => (
              <ProfileListingItem key={props._id} me={profile} {...props} />
            ))}
          </div>
        </Grid>
      </Splash>
      <Grid item style={{ margin: "2em auto", position: "relative" }}>
        {!error && !loading && sitters.length > 0 && metadata[0].isMore ? (
          <Button
            onClick={handleClickMore}
            className={classes.button}
            color="primary"
            size="large"
            variant="contained"
            disabled={showMoreLoading}
          >
            Show More
          </Button>
        ) : null}
        {showMoreLoading && (
          <CircularProgress size={24} className={classes.moreLoading} />
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileListings;
