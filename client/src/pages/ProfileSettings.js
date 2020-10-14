import { Drawer, List, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AccountCircle, Photo, CreditCard, Security, Settings } from '@material-ui/icons'

const drawerWidth = 240;
const styles = (theme) => ({
  linkText: {
    textDecoration: "none",
    color: "#222222",
    fontWeight: 700,
    marginRight: 5,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
});

class ProfileSettings extends Component {
    constructor(props) {
        super(props)
        const origin = '/me'
        this.links = [
          {
            title: "Edit Profile",
            path: `${origin}/edit-profile`,
            icon: <AccountCircle />
          },
          {
            title: "Profile Photo",
            path: `${origin}/profile-photo`,
            icon: <Photo />
          },
          {
            title: "Payment",
            path: `${origin}/payment`,
            icon: <CreditCard />
          },
          {
            title: "Security",
            path: `${origin}/security`,
            icon: <Security />
          },
          {
            title: "Settings",
            path: `${origin}/settings`,
            icon: <Settings />
          },
        ];
    }
    render() {
        const { classes } = this.props;
        return (
          <div>
            <Drawer variant="permanent" className={classes.drawer}>
              <List>
                {this.links.map((link) => (
                  <Link className={classes.linkText} to={link.path}>
                    <ListItem>
                        <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText>{link.title}</ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
          </div>
        );
    }
}

export default withStyles(styles)(ProfileSettings);