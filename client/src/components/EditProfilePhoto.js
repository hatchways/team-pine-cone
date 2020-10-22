import { Avatar, Button, CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useState } from 'react';
import { useProfileContext } from '../contexts/profile';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: 400
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
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleCloseSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpenSnackbar(false);
    };
    const { profile, setProfile } = useProfileContext()
    const [image, setImage] = useState(profile && profile.photo);
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
        handleDelete(false)
        fetch("/upload", options).then(response => {
            response.json().then(result => {
                setImage(result.url)
                profile.photo = result.url
                setProfile(profile)
                setUploading(false)
            }).catch(() => {
              setOpenSnackbar(true);
              setUploading(false);
            })
        })
    }
    const handleDelete = (sendRequest=true) => {
        setImage(null)
        if (sendRequest) {
          setUploading(true)
          const options = {
            method: "PUT"
          }
          fetch("/upload/delete", options).then(() => {
            profile.photo = null
            setProfile(profile)
            setUploading(false)
          })
        }
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
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Sorry! Something Went Wrong!" />
      </div>
    );
}

export default EditProfilePhoto;