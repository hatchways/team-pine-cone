import { Card, CircularProgress, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useProfileContext } from '../contexts/profile';

function BecomeASitter(props) {
    const [redirect, setRedirect] = useState(false)
    const { profile, setProfile } = useProfileContext()
    useEffect(() => {
        const profileUpdate = {
            ...profile,
            isSitter: true
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileUpdate)
        }
        fetch(`/profile/${profile._id}`, options).then(response => {
            response.json().then(result => {
                setProfile(result.profile)
                setRedirect(true)
            })
        })
    }, [setProfile, setRedirect, profile])
    return (
        <Fragment>
            <Toolbar />
            {
                redirect ?
                <Redirect to="/me/availability" /> :
                <CircularProgress style={{margin: "20px auto", display: "block"}} />
            }
        </Fragment>
    );
}

export default BecomeASitter;