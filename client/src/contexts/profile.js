import React, {useContext, createContext} from 'react';

export const ProfileContext = createContext(null);

export const useProfileContext = () => {
    const profile = useContext(ProfileContext);
    return profile;
}
