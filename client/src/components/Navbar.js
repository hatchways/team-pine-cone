import React, { Fragment } from "react";
import { Link } from "react-router-dom";
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

const useStyles = makeStyles(theme => ({
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
    zIndex: theme.zIndex.drawer + 1,
  },
}));

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
            <Link className={classes.linkText} to={path} key={title}>
              <MenuItem onClick={handleClose}>{title}</MenuItem>
            </Link>
          ))}
          <Link className={classes.linkText} to={"/me"} key="me">
            <MenuItem onClick={handleClose}>Me</MenuItem>
          </Link>
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
    <AppBar  position="relative" className={classes.navbar}>
      <Toolbar className={classes.navDisplay}>
        <Link to="/">
          <img alt="Loving Sitter" src={window.origin + "/assets/logo.png"} />
        </Link>
        {getNavigation(navOptions)}
      </Toolbar>
    </AppBar>
  );
}

export default withWidth()(Navbar);
