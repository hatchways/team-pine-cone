import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useLocation } from "react-router-dom";

export const ProfileContext = createContext(null);

export const useProfileContext = () => {
  const profileContext = useContext(ProfileContext);
  return profileContext;
};

function ProfileProvider(props) {
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState({});
  const getProfile = id => {
    return new Promise(resolve => {
      if (profiles[id]) {
        resolve(profiles[id]);
      }
      else {
        fetch(`/profile/${id}`).then((response) => {
          response.json().then((profile) => {
            const newProfiles = {...profiles}
            newProfiles[id] = profile;
            setProfiles(newProfiles)
            resolve(profile);
          });
        });
      }
    })
  }
  const firstUpdate = useRef(true);
  const prevLocation = useRef(null);
  const context = {
    profile,
    setProfile: (profileUpdate) => {
      const newProfile = { ...profileUpdate };
      setProfile(newProfile);
    },
    pullProfile: () => {
      fetch("/profile/me").then((response) => {
        response.json().then((result) => {
          setProfile(result)
        });
      });
    },
    getProfile
  };
  const location = useLocation().pathname;
  useEffect(() => {
    if (firstUpdate.current) {
      context.pullProfile()
      firstUpdate.current = false;
    } else {
      const hasLoggedIn = (prevLocation.current === "/login" || prevLocation.current === "/signup") && (location !== "/login" && location !== "/signup");
      if (hasLoggedIn) {
        context.pullProfile();
      }
    }
    prevLocation.current = location;
  });
  return (
    <ProfileContext.Provider value={context}>
      {props.children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
