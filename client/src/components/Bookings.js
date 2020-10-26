import { Card, makeStyles, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react';
import Subcard from './Subcard';

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
    const subcardDummyData = {
        photoSrc: "https://team-pine-cone.s3.amazonaws.com/26233331_1999431303611867_6513675455554858596_o-Mon%20Oct%2026%202020%2018%3A37%3A06%20GMT-0400%20%28Eastern%20Daylight%20Time%29.jpg",
        name: "Dan Proctor",
        start: new Date(),
        end: new Date()
    }
    return (
        <Fragment>
            <Toolbar />
            <Card className={classes.mainCard}>
                <h1>{isMyJobs ? "My Jobs" : "My Sitters"}</h1>
                <h2>Upcoming Bookings</h2>
                <Subcard {...subcardDummyData} isBooking={true} />
                <p className={classes.emptyText}>No upcoming bookings</p>
                <h2>Pending Requests</h2>
                <Subcard {...subcardDummyData} />
                <p className={classes.emptyText}>No pending requests</p>
            </Card>
        </Fragment>
    );
}

export default Bookings;