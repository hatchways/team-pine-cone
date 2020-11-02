import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const DefaultSnackBar = function ({
  open,
  message = "Sorry! Something Went Wrong!",
  duration = 6000,
  severity = "error",
}) {
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  return (
    <Snackbar
      open={!close && !!open}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default DefaultSnackBar;
