import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
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
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useUserContext } from "../contexts/user";
import { useProfileContext } from "../contexts/profile";

const useStyles = makeStyles((theme) => ({
  navDisplay: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    color: "#222222",
    marginRight: 5,
  },
  navbar: {
    backgroundColor: "#EEEEEE",
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function getNavigation({ width, classes, anchorEl, handleClick, handleClose, profile }) {
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
            <MenuItem
              component={Link}
              to={path}
              key={title}
              onClick={handleClose}
            >
              {title}
            </MenuItem>
          ))}
            <MenuItem
              component={Link}
              to={"/me"}
              key="me"
              onClick={handleClose}
            >
              Me
            </MenuItem>
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
          {profile.photo ? <Avatar src={profile.photo} /> : <Avatar>D</Avatar>}
        </NavLink>
      </List>
    );
  }
}

function Navbar(props) {
  const { user } = useUserContext();
  const classes = useStyles();
  const { profile } = useProfileContext();

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
    width: props.width,
    profile
  };
  return user ? (
    <AppBar position="fixed" className={classes.navbar}>
      <Toolbar className={classes.navDisplay}>
        <NavLink to="/">
          <img alt="Loving Sitter" src={window.origin + "/assets/logo.png"} />
        </NavLink>
        {getNavigation(navOptions)}
      </Toolbar>
    </AppBar>
  ) : null;
}

export default withWidth()(Navbar);
