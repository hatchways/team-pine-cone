import { CircularProgress, Toolbar } from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useProfileContext } from "../contexts/profile";

function BecomeASitter() {
  const [redirect, setRedirect] = useState(false);
  const { profile, pullProfile } = useProfileContext();
  useEffect(() => {
    const profileUpdate = {
      ...profile,
      isSitter: true
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileUpdate)
    };
    fetch(`/profile/${profile._id}`, options).then(response => {
      response.json().then(result => {
        pullProfile();
        setRedirect(true);
      });
    });
  }, [pullProfile, setRedirect, profile]);
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