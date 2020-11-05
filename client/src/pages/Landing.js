import React from 'react';
import { Redirect } from 'react-router-dom';
import { useUserContext } from '../contexts/user';
import ProfileListings from './ProfileListings';

function Landing(props) {
    const {user} = useUserContext()
    return user ? (
        <Redirect to="/profiles" />
    ) :
    <ProfileListings />
}

export default Landing;