import { Drawer, Toolbar, makeStyles, List } from '@material-ui/core';
import React, { Fragment } from 'react';
import ConversationSidebar from '../components/ConversationSidebar';
import { useProfileContext } from '../contexts/profile';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  linkText: {
    textDecoration: "none",
    color: "#222222",
    marginRight: 5,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.between("xs", "sm")]: {
      width: 75,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.between("xs", "sm")]: {
      width: 75,
    },
  },
  noMobileText: {
    display: "auto",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none",
    },
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "scroll",
  },
  root: {
    display: "flex",
    height: "100vh",
  },
  card: {
    padding: theme.spacing(3),
    height: "max-content",
  },
  logout: {
    cursor: "pointer",
  },
}));

function Messaging(props) {
    const {profile} = useProfileContext();
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            >
            <Toolbar />
                <List className={classes.drawerContainer}>
                    {profile && profile.conversations.map(conversation => (
                        <ConversationSidebar key={conversation._id} {...conversation} />
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default Messaging;