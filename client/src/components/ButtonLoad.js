import React from "react";
import { Button, CircularProgress } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles/";

const useStyles = makeStyles(() => ({
  circularProgress: {
    position: "absolute",
    left: 10,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },
  wrapper: {
    position: "relative",
  },
}));

const ButtonLoad = function ({ loading, children, ...buttonProps }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button disabled={loading} {...buttonProps}>
        {children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.circularProgress} />
      )}
    </div>
  );
};

export default ButtonLoad;
