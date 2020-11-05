import { Avatar, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfileContext } from '../contexts/profile';

const useStyles = makeStyles({
  linkText: {
    textDecoration: "none",
    color: "#222222",
  },
  avatar: {
    margin: 10
  },
  conversation: {
    borderBottom: "1px solid #cccccc"
  },
  message: {
    marginLeft: 30,
    fontSize: 12
  }
});

function ConversationSidebar({user_id, sitter_id, _id, messages}) {
    const { profile, getProfile } = useProfileContext();
    const [name, setName] = useState("");
    const [src, setSrc] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        const partnerId = profile._id === user_id ? sitter_id : user_id;
        getProfile(partnerId).then(partner => {
            setName(`${partner.firstName} ${partner.lastName}`);
            setSrc(partner.photo);
        })
    }, [setName, setSrc, profile, user_id, sitter_id, getProfile])
    return (
      <Link className={classes.linkText} to={`/messages/${_id}`}>
        <Grid container direction="column" className={classes.conversation}>
          <Grid item>
            <Grid container alignItems="center">
              <Avatar className={classes.avatar} src={src} />
              <h3>{name}</h3>
            </Grid>
          </Grid>
          <Grid item>
            <p className={classes.message}>
              {messages[0] &&
                `${
                  messages[messages.length - 1].sender === profile._id
                    ? "You"
                    : name
                }: ${messages[messages.length - 1].body}`}
            </p>
          </Grid>
        </Grid>
      </Link>
    );
}

export default ConversationSidebar;