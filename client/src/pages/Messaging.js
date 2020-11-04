import React from 'react';
import { useProfileContext } from '../contexts/profile';

function Messaging(props) {
    const {profile} = useProfileContext();
    console.log(profile.conversations);
    return (
        <div>
            
        </div>
    );
}

export default Messaging;