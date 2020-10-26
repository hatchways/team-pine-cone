import { Card, makeStyles, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react';
import Subcard from './Subcard';

const useStyles = makeStyles({
    mainCard: {
        padding: 10,
        textAlign: "center",
        margin: 20
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
                <Subcard />
                <p>No upcoming bookings</p>
                <h2>Pending Requests</h2>
                <Subcard />
                <p>No pending requests</p>
            </Card>
        </Fragment>
    );
}

export default Bookings;