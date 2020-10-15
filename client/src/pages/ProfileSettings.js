import {
  Card,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  withStyles,
  withWidth,
} from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  Photo,
  CreditCard,
  Security,
  Settings,
} from "@material-ui/icons";

const drawerWidth = 240;
const styles = (theme) => ({
  linkText: {
    textDecoration: "none",
    color: "#222222",
    marginRight: 5,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    [theme.breakpoints.between("xs", "sm")]: {
      width: 50,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.between("xs", "sm")]: {
      width: 50,
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
  },
});

class ProfileSettings extends Component {
  constructor(props) {
    super(props);
    const origin = "/me";
    this.links = [
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
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar />
          <List className={classes.drawerContainer}>
            {this.links.map((link) => (
              <Link className={classes.linkText} to={link.path}>
                <ListItem>
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  {this.props.width !== "xs" && this.props.width !== "sm" && (
                    <ListItemText>{link.title}</ListItemText>
                  )}
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        <div className={classes.content}>
          <Toolbar />
          <Card className={classes.card}>Content</Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withWidth()(ProfileSettings));
