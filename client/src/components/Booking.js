import { Avatar, Button, Card, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useProfileContext } from "../contexts/profile";

const useStyles = makeStyles({
  booking: {
    display: "grid",
    gridAutoColumns: "auto",
    gridAutoRows: "auto",
    padding: 20,
    alignItems: "center",
    textAlign: "left",
    marginTop: 10
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

const formatDate = dateStr => {
  const date = new Date(dateStr)
  return `${doubleNumber(date.getMonth() + 1)}/${doubleNumber(date.getDate())} ${doubleNumber(date.getHours())}:${doubleNumber(date.getMinutes())}`
}

const doubleNumber = number => (
  number < 10 ? `0${number}` : number
)

function Booking({ _id, isBooking, isMyJobs, sitter_id, user_id, start, end, paid }) {
  const classes = useStyles();
  const { profile, setProfile } = useProfileContext();
  const [src, setSrc] = useState(null);
  const [name, setName] = useState("");
  useEffect(() => {
      const id = isMyJobs ? user_id : sitter_id
      fetch(`/profile/${id}`).then(response => {
        response.json().then(profile => {
          setSrc(profile.photo);
          setName(`${profile.firstName} ${profile.lastName}`);
        })
      })
  },[setSrc, isMyJobs, sitter_id, user_id])
  const handleAccept = () => {
    handleAcceptOrDecline(true)
  }
  const handleDecline = () => {
    handleAcceptOrDecline(false)
  }
  const handleAcceptOrDecline = accept => {
    const newProfile = {...profile}
    let updatedRequest
    newProfile.requests.forEach(request => {
      if (request._id === _id) {
        request.accepted = accept
        request.declined = !accept
        updatedRequest = request
      }
    })
    setProfile(newProfile)
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRequest),
    };
    fetch(`/request/update/${updatedRequest._id}`, options);
  }
  return (
    <Card variant="outlined" className={classes.booking}>
      <Avatar src={src} className={classes.photo} />
      <h2 className={classes.name}>{name}</h2>
      <h3 className={classes.date}>
        {formatDate(start)} - {formatDate(end)}
      </h3>
      <Button
        onClick={isBooking ? null : handleAccept}
        color="primary"
        variant="contained"
        className={classes.button1}
      >
        {isBooking ? "Message" : "Accept"}
      </Button>
      <Button
        onClick={isBooking ? null : handleDecline}
        color="primary"
        variant="contained"
        className={classes.button2}
      >
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
