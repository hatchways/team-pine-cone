import { Card, makeStyles, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react';

const useStyles = makeStyles({
    mainCard: {
        padding: 10,
        textAlign: "center",
        margin: 20
    },
    subCard: {
        display: "grid",
        gridAutoColumns: "auto",
        padding: 10,
    }
})

function Bookings({ isMyJobs }) {
    const classes = useStyles()
    return (
        <Fragment>
            <Toolbar />
            <Card className={classes.mainCard}>
                <h1>{isMyJobs ? "My Jobs" : "My Sitters"}</h1>
                <h2>Upcoming Bookings</h2>
                <Card variant="outlined" className={classes.subCard}>
                    Booking
                </Card>
                <p>No upcoming bookings</p>
                <h2>Pending Requests</h2>
                <Card variant="outlined" className={classes.subCard}>
                    Request
                </Card>
                <p>No pending requests</p>
            </Card>
        </Fragment>
    );
}

export default Bookings;