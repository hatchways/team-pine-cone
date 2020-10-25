import React, { useState } from "react";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	font: { 
		color: theme.palette.primary.light,
	}
}));

const DefaultSnackBar = function ({
  open,
  onClose,
  message = "Sorry! Something Went Wrong!",
  duration = 6000,
}) {
  const classes = useStyles();
  const [close, setClose] = useState(true);

  return (
    <Snackbar
      open={close && !!open}
      autoHideDuration={duration}
      onClose={() => setClose(false)}
    >
      <SnackbarContent classes={{message: classes.font}} message={message} />
    </Snackbar>
  );
};

export default DefaultSnackBar;
