import React, {useContext, createContext, useState} from 'react';

const ProfileContext = createContext(null);

export const useProfileContext = () => {
    const profileContext = useContext(ProfileContext);
    return profileContext;
}

export function ProfileProvider({ children }) {
    const [profile, setProfile] = useState({
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*",
    });
    return (
        <ProfileContext.Provider value={{profile, setProfile}}>{children}</ProfileContext.Provider>
    )
}
