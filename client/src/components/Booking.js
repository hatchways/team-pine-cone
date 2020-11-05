import { Avatar, Button, Card, makeStyles } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { useProfileContext } from "../contexts/profile";
import moment from "moment";
import { differenceInHours } from "date-fns";
import MessageDialog from "./MessageDialog";
import ButtonLoad from "./ButtonLoad";
import DefaultSnackbar from "./DefaultSnackbar";
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

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
      margin: "5px auto",
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

const formatDate = (dateStr) => moment(dateStr).format("MMM D h:mma");

function Booking({
  _id,
  isBooking,
  isMyJobs,
  sitter_id,
  user_id,
  start,
  end,
  paid,
  fulfilled,
}) {
  const classes = useStyles();
  const { profile, setProfile, getProfile, pullProfile } = useProfileContext();
  const [src, setSrc] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, onSuccess] = useState(null);
  const [noAccount, setNoAccount] = useState(false);
  const id = isMyJobs ? user_id : sitter_id;
  useEffect(() => {
    const id = isMyJobs ? user_id : sitter_id;
    getProfile(id).then((result) => {
      setSrc(result.photo);
      setName(`${result.firstName} ${result.lastName}`);
    });
  }, [setSrc, isMyJobs, sitter_id, user_id, setName, getProfile]);
  const handleAccept = () => {
    handleAcceptOrDecline(true);
  };
  const handleDecline = () => {
    handleAcceptOrDecline(false);
  };
  const handleAcceptOrDecline = (accept) => {
    const newProfile = { ...profile };
    let updatedRequest;
    newProfile.requests.forEach((request) => {
      if (request._id === _id) {
        request.accepted = accept;
        request.declined = !accept;
        updatedRequest = request;
      }
    });
    setProfile(newProfile);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRequest),
    };
    fetch(`/request/update/${updatedRequest._id}`, options);
  };

  const handlePay = () => {
    onSuccess("");
    setError("");
    setLoading(true);

    (async function () {
      try {
        const sitter = await fetch(`/profile/${sitter_id}`).then((res) =>
          res.json()
        );

        if (!profile) await pullProfile();

        const userAccountRes = await fetch(
          `/payment/account/validate/${profile._id}`
        );

        if (!userAccountRes.ok || !profile.stripe?.customerId) {
          setLoading(false);
          return setNoAccount(true);
        }

        const diffHours = differenceInHours(new Date(end), new Date(start));
        const amount = Number(Number(sitter.hourlyRate * diffHours).toFixed(2));
        const res = await fetch(`/request/${_id}/pay`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });

        if (!res.ok) throw res;
        onSuccess("Payment success!");
      } catch (e) {
        const err = await e.json();
        setError(err?.error?.message || "Payment could not be completed");
      }
      setLoading(false);
    })();
  };
	console.log(isMyJobs);

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
            {!success && (
              <ButtonLoad
                onClick={
                  isBooking ? (paid ? handleDecline : handlePay) : handleDecline
                }
                color="primary"
                variant="contained"
                className={classes.button}
                title="Incomplete Payment Set-Up"
                loading={loading}
              >
                {isBooking ? (isMyJobs || paid ? "Cancel" : "Pay") : "Decline"}
              </ButtonLoad>
            )}
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
			  { !isMyJobs && fulfilled === "PENDING" && (
				  <Rating value={4}/>			
			  ) }
          </Fragment>
        )}
      </div>
      <MessageDialog open={noAccount} openFn={setNoAccount} title="Warning">
        You must create a payment account with Stripe and install a payment
        method in order to pay a LovingSitter. Please go to profile payments and
        complete the required steps there.
      </MessageDialog>
      {error && <DefaultSnackbar open={error} message={error} />}
      {success && (
        <DefaultSnackbar open={success} message={success} severity="success" />
      )}
    </Card>
  );
}

export default Booking;
