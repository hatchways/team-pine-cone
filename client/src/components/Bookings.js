import { Card, makeStyles, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react';
import { useProfileContext } from '../contexts/profile';
import Booking from './Booking';

const useStyles = makeStyles({
    mainCard: {
        padding: 10,
        textAlign: "center",
        margin: 20
    },
    emptyText: {
        fontStyle: "italic",
        fontSize: 10
    }
})

function Bookings({ isMyJobs }) {
    const classes = useStyles()
    const { profile } = useProfileContext()
    const bookings = profile && profile.requests.filter(
      (request) =>
        ((isMyJobs && request.sitter_id === profile._id) ||
          (!isMyJobs && request.user_id === profile._id)) &&
        request.accepted
    );
    const requests = profile && profile.requests.filter(
      (request) =>
        ((isMyJobs && request.sitter_id === profile._id) ||
          (!isMyJobs && request.user_id === profile._id)) &&
        !request.accepted && !request.declined
    );
    return (
      <Fragment>
        <Toolbar />
        <Card className={classes.mainCard}>
          <h1>{isMyJobs ? "My Jobs" : "My Sitters"}</h1>
          <h2>Upcoming Bookings</h2>
          {bookings && bookings.map((booking) => (
            <Booking key={booking._id} isMyJobs={isMyJobs} {...booking} isBooking={true} />
          ))}
          {(!bookings || bookings.length === 0) && (
            <p className={classes.emptyText}>No upcoming bookings</p>
          )}
          <h2>Pending Requests</h2>
          {requests && requests.map((request) => (
            <Booking key={request._id} isMyJobs={isMyJobs} {...request} />
          ))}
          {(!requests || requests.length === 0) && (
            <p className={classes.emptyText}>No pending requests</p>
          )}
        </Card>
      </Fragment>
    );
}

export default Bookings;
