import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Avatar,
  withWidth, 
  Menu, 
  MenuItem, 
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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

function getNavigation({ width, classes, anchorEl, handleClick, handleClose }) {
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
  if (width === "sm" || width === "xs") {
    return (
      <Fragment>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {navLinks.map(({ title, path }) => (
            <NavLink className={classes.linkText} to={path} key={title}>
              <MenuItem onClick={handleClose}>{title}</MenuItem>
            </NavLink>
          ))}
          <NavLink className={classes.linkText} to={"/me"} key="me">
            <MenuItem onClick={handleClose}>Me</MenuItem>
          </NavLink>
        </Menu>
      </Fragment>
    );
  } else {
    return (
      <List
        className={classes.navDisplay}
        component="nav"
        aria-labelledby="main navigation"
      >
        {navLinks.map(({ title, path }) => (
          <NavLink className={classes.linkText} to={path} key={title}>
            <ListItem button>
              <ListItemText primary={title} />
            </ListItem>
          </NavLink>
        ))}
        <NavLink className={classes.linkText} to="/me">
          <Avatar>D</Avatar>
        </NavLink>
      </List>
    );
  }
}

function Navbar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navOptions = {
      classes,
      anchorEl,
      handleClick,
      handleClose,
      width: props.width
  }
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar className={classes.navDisplay}>
        <NavLink to="/">
          <img alt="Loving Sitter" src={window.origin + "/assets/logo.png"} />
        </NavLink>
        {getNavigation(navOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default withWidth()(Navbar);
