import React, { useEffect, useRef } from 'react';
import Bookings from '../components/Bookings';
import { useProfileContext } from '../contexts/profile';

function MyJobs(props) {
    const {profile, pullProfile} = useProfileContext()
    const readNotifications = useRef(false);
    useEffect(() => {
      if (profile && !readNotifications.current) {
        profile.notifications = profile.notifications.filter(
          (notification) => notification.link !== "/my-jobs"
        );
        fetch(`/profile/${profile._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        }).then(() => {
          pullProfile();
        })
        readNotifications.current = true;
      }
    });
    return (
        <Bookings isMyJobs={true} />
    );
}

export default MyJobs;