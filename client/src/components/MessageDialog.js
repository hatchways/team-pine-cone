import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

const MessageDialog = function ({ children, title, open = true, openFn }) {
  return (
    <Dialog
      open={open}
      onClose={() => openFn(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => openFn(false)}
          variant="contained"
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
