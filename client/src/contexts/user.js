import React, { useContext, createContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext(null);

export const useUserContext = function () {
  const user = useContext(UserContext);
  return user;
};

export const AuthProvider = function ({ children }) {
  const auth = useAuth();

  const context = {
    ...auth,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserContext;
