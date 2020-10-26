import { Card, Toolbar } from '@material-ui/core';
import React, { Fragment } from 'react';

function Bookings({ isMyJobs }) {
    return (
        <Fragment>
            <Toolbar />
            <Card>
                <h2>{isMyJobs ? "My Jobs" : "My Sitters"}</h2>
            </Card>
        </Fragment>
    );
}

export default Bookings;