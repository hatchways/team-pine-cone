import React from 'react';
import Bookings from '../components/Bookings';

function MyJobs(props) {
    return (
        <Bookings isMyJobs={true} />
    );
}

export default MyJobs;