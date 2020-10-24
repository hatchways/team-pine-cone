import React, {useContext, createContext } from 'react';
import { withRouter } from 'react-router-dom';

export const ProfileContext = createContext(null);

export const useProfileContext = () => {
    const profileContext = useContext(ProfileContext);
    return profileContext;
}

class ProfileProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: null,
            setProfile: profile => { this.setState({profile}) }
        }
    }
    componentDidMount() {
        fetch("/profile/me").then(profile => {
            profile.json().then(result => {
                this.state.setProfile(result);
            })
        })
    }
    componentDidUpdate(prevProps) {
        const hasLoggedIn = (prevProps.location.pathname === "/login" || prevProps.location.pathname === "/signup") && (this.props.location.pathname !== "/login" || this.props.location.pathname !== "/signup")
        if (hasLoggedIn) {
            fetch("/profile/me").then((profile) => {
              profile.json().then((result) => {
                this.state.setProfile(result);
              });
            });
        }
    }
    render() {
        return (
            <ProfileContext.Provider value={this.state}>{this.props.children}</ProfileContext.Provider>
        )
    }
}

export default withRouter(ProfileProvider);
