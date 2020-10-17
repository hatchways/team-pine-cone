import { Avatar, Button, CircularProgress, makeStyles } from '@material-ui/core';
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
    const [uploading, setUploading] = useState(false);
    const handleChange = e => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        const options = {
            method: "POST",
            body: formData
        }
        setUploading(true)
        handleDelete()
        fetch("/upload", options).then(response => {
            response.json().then(result => {
                setImage(result.url)
                setUploading(false)
            })
        })
    }
    const handleDelete = () => {
        setImage(null)

        // PUT to delete the image from the profile model and S3
    }
    return (
      <div className={classes.root}>
        <h2>Profile Photo</h2>
        {image ? (
          <Avatar className={classes.photo} alt="profile" src={image} />
        ) : (
            uploading ? (
                <CircularProgress />
            ) : (
                <Avatar className={classes.photo}>No Photo</Avatar>
            )
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
        <Button onClick={handleDelete} size="small" variant="outlined">
          <Delete fontSize="small" style={{ marginRight: 5 }} /> Delete Photo
        </Button>
      </div>
    );
}

export default EditProfilePhoto;