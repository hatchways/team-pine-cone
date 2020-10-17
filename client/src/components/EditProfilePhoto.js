import { Avatar, Button, makeStyles } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
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
}))

function EditProfilePhoto(props) {
    const classes = useStyles()
    const [image, setImage] = useState(null);
    const handleChange = e => {
        const file = Array.from(e.target.files)[0]
        const formData = new FormData()
        formData.append(0, file)
        // POST formData to backend when integrating

        // setImage to url
    }
    return (
      <div className={classes.root}>
        <h2>Profile Photo</h2>
        {image ? (
          <Avatar className={classes.photo} alt="profile" src={image} />
        ) : (
          <Avatar className={classes.photo}>No Photo</Avatar>
        )}
        <p className={classes.helper}>
          Please select a photo that clearly shows your face
        </p>
        <input
          onChange={handleChange}
          accept="image/*"
          style={{ display: "none" }}
          id="photo-upload"
          type="file"
        />
        <label htmlFor="photo-upload">
          <Button size="large" color="primary" variant="outlined" component="span">
            Upload a file from your device
          </Button>
        </label>
        <Button size="small" variant="outlined">
          <Delete fontSize="small" style={{ marginRight: 5 }} /> Delete Photo
        </Button>
      </div>
    );
}

export default EditProfilePhoto;