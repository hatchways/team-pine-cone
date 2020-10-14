import { Drawer, List, ListItem } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSidebarOpen: true
        }
        const origin = '/me'
        this.links = [
          {
            title: "Edit Profile",
            path: `${origin}/edit-profile`,
          },
          {
            title: "Profile Photo",
            path: `${origin}/profile-photo`,
          },
          {
            title: "Payment",
            path: `${origin}/payment`,
          },
          {
            title: "Security",
            path: `${origin}/security`,
          },
          {
            title: "Settings",
            path: `${origin}/settings`,
          },
        ];
    }
    render() {
        return (
            <div>
                <Drawer open={this.state.isSidebarOpen}>
                    <List>
                        {this.links.map(link => (
                            <Link to={link.path}>
                                <ListItem>{link.title}</ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default ProfileSettings;