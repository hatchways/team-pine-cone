import React, { useState, useRef, useEffect } from "react";
import { socket } from "../services/socket";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const AlertCenter = function () {
  const player = useRef(document.getElementById("player"));
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const handler = (profile) => {
      if (profile.notifications.length > 0) {
        const last = profile.notifications[profile.notifications.length - 1];
        if (last.title === "New Request") {
          player.current.play();
          setMessage(
            `A new Request from ${profile.firstName} ${profile.lastName}`
          );
          setOpen(true);
        }
      }
    };
    socket.on("update", handler);

    return () => socket.off("update", handler);
  }, []);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          variant="filled"
          elevation={6}
          onClose={handleClose}
          severity="success"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertCenter;
