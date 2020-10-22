import React, {useContext, createContext, useState, useEffect} from 'react';

export const ProfileContext = createContext(null);

export const useProfileContext = () => {
    const profileContext = useContext(ProfileContext);
    return profileContext;
}

export class ProfileProvider extends React.Component {
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
    render() {
        return (
            <ProfileContext.Provider value={this.state}>{this.props.children}</ProfileContext.Provider>
        )
    }
}
