import { Avatar, Button, Card, Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProfileContext } from '../contexts/profile';
import { socket } from '../services/socket';

const useStyles = makeStyles(theme => ({
    input: {
        width: "100%",
        marginTop: 30,
        marginBottom: 10,
        borderTop: "1px solid #cccccc",
        paddingTop: 40
    },
    emptyText: {
        fontStyle: "italic",
        fontSize: 10,
        textAlign: "center"
    },
    header: {
        padding: 10,
        borderBottom: "1px solid #cccccc",
        marginBottom: 20
    },
    avatar: {
        margin: 10,
    },
    message: {
        padding: 10,
        width: "60%",
        marginBottom: 10,
        borderRadius: 10,
        fontWeight: 700
    },
    fromUser: {
        backgroundColor: theme.palette.primary.main,
        color: "#fcfcfc",
        marginLeft: "auto"
    },
    notFromUser: {
        backgroundColor: "#cccccc"
    }
}))

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
    useEffect(() => {
        if (conversation) {
            const partnerId = profile._id === conversation.user_id ? conversation.sitter_id : conversation.user_id;
            getProfile(partnerId).then((partner) => {
              setName(`${partner.firstName} ${partner.lastName}`);
              setSrc(partner.photo);
            });
        }
    }, [setName, setSrc, profile, conversation, getProfile]);
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