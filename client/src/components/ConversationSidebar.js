import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useProfileContext } from '../contexts/profile';

function ConversationSidebar({user_id, sitter_id, messages}) {
    const { profile, getProfile } = useProfileContext();
    const [name, setName] = useState("");
    const [src, setSrc] = useState(null);
    useEffect(() => {
        const partnerId = profile._id === user_id ? sitter_id : user_id;
        getProfile(partnerId).then(partner => {
            setName(`${partner.firstName} ${partner.lastName}`);
            setSrc(partner.photo);
        })
    }, [setName, setSrc])
    return (
        <div>
            <Avatar src={src} />
            <h3>{name}</h3>
        </div>
    );
}

export default ConversationSidebar;