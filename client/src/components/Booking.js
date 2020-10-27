import { Avatar, Button, Card, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles({
  Booking: {
    display: "grid",
    gridAutoColumns: "auto",
    gridAutoRows: "auto",
    padding: 20,
    alignItems: "center",
    textAlign: "left",
  },
  photo: {
    gridColumn: "1 / span 1",
    marginLeft: 0,
  },
  name: {
    gridColumn: "2 / span 1",
  },
  date: {
    gridColumn: "3 / span 1",
  },
  button1: {
    gridColumn: "4 / span 1",
    marginLeft: 10,
  },
  button2: {
    gridColumn: "5 / span 1",
    marginLeft: 10,
  },
  button3: {
    gridColumn: "6 / span 1",
    marginLeft: 10,
  },
});

const formatDate = date => (
    `${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
)

function Booking({ isBooking, isMyJobs, sitter_id, user_id, start, end, paid }) {
  const classes = useStyles();
  const [src, setSrc] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
      const id = isMyJobs ? user_id : sitter_id
      fetch(`/profile/${id}`).then(response => {
          setSrc(response.body.photo);
          setName(`${response.body.firstName} ${response.body.lastName}`);
      })
  },[setSrc, isMyJobs, sitter_id, user_id])
  return (
    <Card variant="outlined" className={classes.Booking}>
      <Avatar src={src} className={classes.photo} />
      <h2 className={classes.name}>{name}</h2>
      <h3 className={classes.date}>
        {formatDate(start)} - {formatDate(end)}
      </h3>
      <Button color="primary" variant="contained" className={classes.button1}>
        {isBooking ? "Message" : "Accept"}
      </Button>
      <Button color="primary" variant="contained" className={classes.button2}>
        {isBooking ? (paid ? "Cancel" : "Pay") : "Decline"}
      </Button>
      {isBooking && !paid && (
        <Button color="primary" variant="contained" className={classes.button3}>
          Cancel
        </Button>
      )}
    </Card>
  );
}

export default Booking;
