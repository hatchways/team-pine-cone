import React, {useContext, createContext, useState, useEffect} from 'react';

export const ProfileContext = createContext(null);

export const useProfileContext = () => {
    const profileContext = useContext(ProfileContext);
    return profileContext;
}

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        fetch("/profile/me").then(profile => {
            profile.json().then(result => {
                setProfile(result);
            })
        })
    }, [])
    return (
        <ProfileContext.Provider value={{profile, setProfile}}>{children}</ProfileContext.Provider>
    )
}
