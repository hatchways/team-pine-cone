import React, { Fragment, useRef } from 'react';
import { useProfileContext } from './profile';
import { socket } from "../services/socket";

function SocketHandler({children}) {
    const {profile, setProfile, pullProfile} = useProfileContext()
    const oldProfile = useRef(profile)
    if (profile && (!oldProfile.current || oldProfile.current._id !== profile._id)) {
        socket.emit("profile", profile._id);
        socket.on("notification", notification => {
            profile.notifications.push(notification)
            setProfile(profile)
        })
        setInterval(() => {
            socket.emit("keep-alive")
        },60000)
        socket.on("update", () => {
            pullProfile()
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
