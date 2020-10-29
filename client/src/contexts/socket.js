import React, { Fragment, useRef } from 'react';
import socketClient from "socket.io-client";
import { useProfileContext } from './profile';

function SocketHandler({children}) {
    const socket = socketClient(window.location.origin + "/")
    const {profile, setProfile} = useProfileContext()
    const oldProfile = useRef(profile)
    if (profile && (!oldProfile.current || oldProfile.current._id !== profile._id)) {
        socket.emit("profile", profile._id);
        socket.on("notification", notification => {
            profile.notifications.push(notification)
            setProfile(profile)
        })
        socket.on("profile update", update => {
            setProfile(update)
        })
        oldProfile.current = profile
    }
    return (
        <Fragment>
            {children}
        </Fragment>
    );
}

export default SocketHandler;