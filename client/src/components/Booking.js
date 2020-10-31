import { Avatar, Button, Card, makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useProfileContext } from "../contexts/profile";
import moment from "moment";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  booking: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 3fr 3fr",
    gridAutoRows: "auto",
    padding: 20,
    alignItems: "center",
    textAlign: "left",
    marginTop: 10,
    [theme.breakpoints.between("xs", "sm")]: {
      textAlign: "center",
      gridTemplateColumns: "1fr",
    },
  },
  photo: {
    gridColumn: "1 / span 1",
    marginLeft: 0,
    width: 75,
    height: 75,
    [theme.breakpoints.between("xs", "sm")]: {
      gridRow: "1 / span 1",
      gridColumn: "1 / span 1",
      margin: "5px auto"
    },
  },
  name: {
    gridColumn: "2 / span 1",
    marginBottom: 10,
    textDecoration: "none",
    color: "#222222",
    [theme.breakpoints.between("xs", "sm")]: {
      gridRow: "2 / span 1",
      gridColumn: "1 / span 1",
    },
  },
  date: {
    gridColumn: "3 / span 1",
    [theme.breakpoints.between("xs", "sm")]: {
      gridRow: "3 / span 1",
      gridColumn: "1 / span 1",
    },
  },
  buttons: {
    gridColumn: "4 / span 1",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.between("xs", "sm")]: {
      gridRow: "4 / span 1",
      gridColumn: "1 / span 1",
    },
  },
  button: {
    marginLeft: 10,
  },
}));

const formatDate = dateStr => moment(dateStr).format("MMM D h:mma")

function Booking({ _id, isBooking, isMyJobs, sitter_id, user_id, start, end, paid }) {
  const classes = useStyles();
  const { profile, setProfile } = useProfileContext();
  const [src, setSrc] = useState(null);
  const [name, setName] = useState("");
  const id = isMyJobs ? user_id : sitter_id
  useEffect(() => {
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
      <Link to={`/profiles/${id}`}>
        <Avatar src={src} className={classes.photo} />
      </Link>
      <Link className={classes.name} to={`/profiles/${id}`}>
        <h2>{name}</h2>
      </Link>
      <h3 className={classes.date}>
        {formatDate(start)} - {formatDate(end)}
      </h3>
      <div className={classes.buttons}>
        {!isBooking && !isMyJobs ? (
          <Button
            onClick={handleDecline}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Cancel
          </Button>
        ) : (
          <Fragment>
            <Button
              onClick={isBooking ? null : handleAccept}
              color="primary"
              variant="contained"
              className={classes.button}
            >
              {isBooking ? "Message" : "Accept"}
            </Button>
            <Button
              onClick={
                isBooking ? (paid ? handleDecline : null) : handleDecline
              }
              color="primary"
              variant="contained"
              className={classes.button}
            >
              {isBooking ? (isMyJobs || paid ? "Cancel" : "Pay") : "Decline"}
            </Button>
            {isBooking && !paid && (
              <Button
                onClick={handleDecline}
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Cancel
              </Button>
            )}
          </Fragment>
        )}
      </div>
    </Card>
  );
}

export default Booking;
