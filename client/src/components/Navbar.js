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
  Badge
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useUserContext } from "../contexts/user";
import { ProfileContext } from "../contexts/profile";

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
  }
}));

function Navigation({
  width,
  classes,
  anchorEl,
  handleClick,
  handleClose,
  profile,
}) {
  const navLinks = [
    {
      title: "Become A Sitter",
      path: "/become-a-sitter",
      show: profile && !profile.isSitter,
    },
    {
      title: "My Sitters",
      path: "/my-sitters",
      show: true,
    },
    {
      title: "My Jobs",
      path: "/my-jobs",
      show: profile && profile.isSitter,
    },
    {
      title: "Messages",
      path: "/messages",
      show: true,
    },
    {
      title: "Find a Sitter",
      path: "/profiles",
      show: true,
    },
  ].filter((x) => x.show);
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
          <MenuItem component={Link} to={"/me"} key="me" onClick={handleClose}>
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
          <Badge badgeContent={4} className={classes.notification} color="primary">
            {profile && profile.photo ? (
              <Avatar src={profile.photo} />
              ) : (
                <Avatar>{profile ? profile.firstName[0] : "?"}</Avatar>
                )}
          </Badge>
        </NavLink>
      </List>
    );
  }
}

function Navbar(props) {
  const { user } = useUserContext();
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
    width: props.width,
  };
  return user ? (
    <ProfileContext.Consumer>
      {(value) => (
        <AppBar position="fixed" className={classes.navbar}>
          <Toolbar className={classes.navDisplay}>
            <NavLink to="/">
              <img
                alt="Loving Sitter"
                src={window.origin + "/assets/logo.png"}
              />
            </NavLink>
            <Navigation profile={value.profile} {...navOptions} />
          </Toolbar>
        </AppBar>
      )}
    </ProfileContext.Consumer>
  ) : null;
}

export default withWidth()(Navbar);
