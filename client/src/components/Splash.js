import React from "react";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  middle: {
    position: "fixed",
    top: "50%",
    right: "50%",
  },
}));

const Splash = function ({ loading, children }) {
  const classes = useStyles();

  return loading ? (
    <CircularProgress className={classes.middle} color="primary" />
  ) : (
    children
  );
};

export default Splash;
