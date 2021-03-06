import { Avatar, Button, Card, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileContext } from '../contexts/profile';
import { socket } from '../services/socket';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginTop: 30,
    marginBottom: 10,
    paddingTop: 40,
  },
  emptyText: {
    fontStyle: "italic",
    fontSize: 10,
    textAlign: "center",
  },
  header: {
    padding: 10,
    borderBottom: "1px solid #cccccc",
    marginBottom: 20,
  },
  avatar: {
    margin: 10,
  },
  message: {
    padding: 10,
    maxWidth: "60%",
    width: "fit-content",
    marginBottom: 10,
    borderRadius: 10,
    fontWeight: 700,
  },
  fromUser: {
    backgroundColor: theme.palette.primary.main,
    color: "#fcfcfc",
    marginLeft: "auto",
  },
  notFromUser: {
    backgroundColor: "#cccccc",
  },
  dateUser: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "right",
    margin: 5,
    fontWeight: 400,
  },
  datePartner: {
    fontSize: 10,
    fontStyle: "italic",
    textAlign: "left",
    margin: 5,
    fontWeight: 400,
  },
}));

function Conversation(props) {
    const {id} = useParams();
    const {profile, getProfile} = useProfileContext();
    const [message, setMessage] = useState("");
    const classes = useStyles();
    const handleChange = e => {
        setMessage(e.target.value)
    }
    const conversation = profile && profile.conversations.filter(x => x._id === id)[0];
    const [name, setName] = useState("");
    const [src, setSrc] = useState(null);
    const firstRender = useRef(true);
    useEffect(() => {
        if (conversation && firstRender.current) {
            const partnerId = profile._id === conversation.user_id ? conversation.sitter_id : conversation.user_id;
            getProfile(partnerId).then((partner) => {
              setName(`${partner.firstName} ${partner.lastName}`);
              setSrc(partner.photo);
            });
            firstRender.current = false
        }
        const read = profile && profile._id === conversation.user_id ? "read_by_user" : "read_by_sitter";
        if (conversation && conversation.messages.filter(x => !x[read]).length > 0) {
            socket.emit("read messages", {
              conversationId: id,
              profileId: profile._id,
            });
        }
    }, [setName, setSrc, profile, conversation, getProfile, id]);
    const handleSend = () => {
        socket.emit("message", {
          conversationId: id,
          message: {
            sender: profile._id,
            body: message,
            read_by_user: profile._id === conversation.user_id,
            read_by_sitter: profile._id === conversation.sitter_id,
          },
        });
        setMessage("")
    }
    return (
        <div>
            <Grid className={classes.header} container alignItems="center" justify="center">
                <Avatar className={classes.avatar} src={src} />
                <h2>{name}</h2>
            </Grid>
            {conversation && conversation.messages.length ? (
                conversation.messages.map((message, i) => (
                    <Card className={`${classes.message} ${message.sender === profile._id ? classes.fromUser : classes.notFromUser}`} key={i} variant="outlined">
                        {message.body}
                        <p className={message.sender === profile._id ? classes.dateUser : classes.datePartner}>{moment(message.createdAt).format("MMM D, YYYY H:mm")}</p>
                    </Card>
                ))
            ) : (
                <p className={classes.emptyText}>Be the first to say "Hello!"</p>
            )}
            <TextField multiline className={classes.input} placeholder="Send a message..." value={message} onChange={handleChange} />
            <Button size="large" variant="contained" color="primary" onClick={handleSend}>Send</Button>
        </div>
    );
}

export default Conversation;