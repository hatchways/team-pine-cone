import { Avatar, Button, Link, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%"
    },
    photo: {
        width: 150,
        height: 150,
        fontSize: 24
    },
    helper: {
        fontSize: 12,
        fontStyle: "italic"
    }
})

function EditProfilePhoto(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <h2>Profile Photo</h2>
            <Avatar className={classes.photo}>D</Avatar>
            <p className={classes.helper}>Please select a photo that clearly shows your face</p>
            <Button variant="outlined">Upload a file from your device</Button>
            <Button variant="outlined"><Delete style={{marginRight: 5}} /> Delete Photo</Button>
        </div>
    );
}

export default EditProfilePhoto;