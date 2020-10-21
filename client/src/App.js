import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";

import { AuthProvider } from "./contexts/user";
import PrivateRoute from "./components/PrivateRoute/";
import { ProfileProvider } from "./contexts/profile";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <ProfileProvider>
            <Navbar />
            <Route exact path="/" component={ProfileSettings} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/me" component={ProfileSettings} />
            <PrivateRoute exact path="/become-a-sitter" component={ProfileSettings} />
            <PrivateRoute exact path="/my-sitters" component={ProfileSettings} />
            <PrivateRoute exact path="/my-jobs" component={ProfileSettings} />
            <PrivateRoute exact path="/messages" component={ProfileSettings} />
          </ProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
