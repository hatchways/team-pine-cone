import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  navDisplay: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    color: "#222222",
    fontWeight: 700,
    marginRight: 5,
  },
  navbar: {
    backgroundColor: "#EEEEEE",
  },
});

function Navbar(props) {
  const classes = useStyles();
  const navLinks = [
    {
      title: "Become A Sitter",
      path: "/become-a-sitter",
    },
    {
      title: "My Sitters",
      path: "/my-sitters",
    },
    {
      title: "My Jobs",
      path: "/my-jobs",
    },
    {
      title: "Messages",
      path: "/messages",
    },
  ];
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar className={classes.navDisplay}>
        <Link to="/">
          <img alt="Loving Sitter" src={window.origin + "/assets/logo.png"} />
        </Link>
        <List
          className={classes.navDisplay}
          component="nav"
          aria-labelledby="main navigation"
        >
          {navLinks.map(({ title, path }) => (
            <Link className={classes.linkText} to={path} key={title}>
              <ListItem button>
                <ListItemText primary={title} />
              </ListItem>
            </Link>
          ))}
          <Link className={classes.linkText} to="/me">
            <Avatar>D</Avatar>
          </Link>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
