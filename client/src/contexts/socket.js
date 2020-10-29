import React, { Fragment } from 'react';
import socketClient from "socket.io-client";
import { useProfileContext } from './profile';

function SocketHandler({children}) {
    const socket = socketClient(window.location.origin + "/")
    const {profile, setProfile} = useProfileContext()
    if (profile) {
        socket.emit("profile", profile._id);
        socket.on("notification", notification => {
            profile.notifications.push(notification)
            setProfile(profile)
        })
    }
    return (
        <Fragment>
            {children}
        </Fragment>
    );
}

export default SocketHandler;