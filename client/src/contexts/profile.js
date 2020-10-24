import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useLocation, withRouter } from "react-router-dom";

export const ProfileContext = createContext(null);

export const useProfileContext = () => {
  const profileContext = useContext(ProfileContext);
  return profileContext;
};

function ProfileProvider(props) {
  const [profile, setProfile] = useState(null);
  const firstUpdate = useRef(true);
  const prevLocation = useRef(null);
  const context = {
    profile,
    setProfile: (profileUpdate) => {
      const newProfile = { ...profileUpdate };
      setProfile(newProfile);
    },
  };
  const location = useLocation().pathname;
  useEffect(() => {
    if (firstUpdate.current) {
      fetch("/profile/me").then((profile) => {
        profile.json().then((result) => {
          setProfile(result);
        });
      });
      firstUpdate.current = false;
    } else {
      const hasLoggedIn = (prevLocation.current === "/login" || prevLocation.current === "/signup") && (location !== "/login" || location !== "/signup");
      if (hasLoggedIn) {
        fetch("/profile/me").then((profile) => {
          profile.json().then((result) => {
            setProfile(result);
          });
        });
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

export default withRouter(ProfileProvider);
