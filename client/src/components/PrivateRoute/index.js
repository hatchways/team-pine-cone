import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../../contexts/user";

const PrivateRoute = function ({ exact, component, children, path }) {
  const { isAuth } = useUserContext();

  return !isAuth ? (
    <Route path={path} exact={exact} component={component}>
      {children}
    </Route>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
