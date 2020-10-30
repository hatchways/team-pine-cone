import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";

const DefaultSnackBar = function ({
  open,
  onClose,
  message = "Sorry! Something Went Wrong!",
  duration = 6000,
}) {
  const [close, setClose] = useState(false);

  return (
    <Snackbar
      open={!!close && !!open}
      autoHideDuration={duration}
      onClose={() => setClose(true)}
      message={message}
    />
  );
};

export default DefaultSnackBar;
