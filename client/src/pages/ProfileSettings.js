import {
  Card,
  Drawer,
  Link as MUILink,
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
  PowerSettingsNew, CalendarToday
} from "@material-ui/icons";
import EditProfilePhoto from "../components/EditProfilePhoto";
import ProfilePayments from "../components/ProfilePayments/";
import ProfileEdit from '../components/ProfileEdit'; 
import { useUserContext } from "../contexts/user";
import Availability from "../components/Availability";
import { useProfileContext } from "../contexts/profile";

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
    display: "auto",
    [theme.breakpoints.between("xs", "sm")]: {
      display: "none"
    },
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflow: "scroll"
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

function ProfileSettings({ children }) {
  const { handleLogOut} = useUserContext();
  const { profile } = useProfileContext();

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
      title: "Availability",
      path: `${origin}/availability`,
      icon: <CalendarToday />,
      hide: !(profile && profile.isSitter)
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
  ].filter(x => !x.hide);
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
          <MUILink
            className={`${classes.linkText} ${classes.logout}`}
            underline="none"
            variant="body2"
            onClick={handleLogOut}
          >
            <ListItem>
              <ListItemIcon>
                <PowerSettingsNew />
              </ListItemIcon>
              <ListItemText className={classes.noMobileText}>
                Log Out
              </ListItemText>
            </ListItem>
          </MUILink>
        </List>
      </Drawer>
      <div className={classes.content}>
        <Toolbar />
        <Card className={classes.card}>
          <Route path={`${origin}/edit-profile`} component={ProfileEdit}/>
          <Route path={`${origin}/profile-photo`} component={EditProfilePhoto} />
          {profile && profile.isSitter && <Route path={`${origin}/availability`} component={Availability} />}
          <Route path={`${origin}/payment`} />
          <Route path={`${origin}/security`} />
          <Route path={`${origin}/settings`} />
        </Card>
      </div>
    </div>
  );
}

export default ProfileSettings;
