import {
  Card,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar
} from "@material-ui/core";
import React from "react";
import { Link, Route } from "react-router-dom";
import {
  AccountCircle,
  Photo,
  CreditCard,
  Security,
  Settings,
} from "@material-ui/icons";
import EditProfilePhoto from "../components/EditProfilePhoto";

const drawerWidth = 240;
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
    display: 'auto',
    [theme.breakpoints.between("xs", "sm")]: {
      display: 'none'
    },
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    display: "flex",
    backgroundColor: "#fbfbfb",
    height: "100vh",
  },
  card: {
    padding: theme.spacing(3),
    height: 500
  },
}));

function ProfileSettings(props) {
  const origin = "/me";
  const links = [
    {
      title: "Edit Profile",
      path: `${origin}/edit-profile`,
      icon: <AccountCircle />,
    },
    {
      title: "Profile Photo",
      path: `${origin}/profile-photo`,
      icon: <Photo />,
    },
    {
      title: "Payment",
      path: `${origin}/payment`,
      icon: <CreditCard />,
    },
    {
      title: "Security",
      path: `${origin}/security`,
      icon: <Security />,
    },
    {
      title: "Settings",
      path: `${origin}/settings`,
      icon: <Settings />,
    },
  ];
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
          {links.map((link) => (
            <Link key={link.path} className={classes.linkText} to={link.path}>
              <ListItem>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText className={classes.noMobileText}>
                  {link.title}
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <Toolbar />
        <Card className={classes.card}>
          <Route path={`${origin}/edit-profile`} />
          <Route path={`${origin}/profile-photo`} component={EditProfilePhoto} />
          <Route path={`${origin}/payment`} />
          <Route path={`${origin}/security`} />
          <Route path={`${origin}/settings`} />
        </Card>
      </div>
    </div>
  );
}

export default ProfileSettings;