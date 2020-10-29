import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileListings from "./pages/ProfileListings";

import { AuthProvider } from "./contexts/user";
import PrivateRoute from "./components/PrivateRoute/";
import ProfileProvider from "./contexts/profile";
import BecomeASitter from "./pages/BecomeASitter";
import MySitters from "./pages/MySitters";
import MyJobs from "./pages/MyJobs";
import SocketHandler from "./contexts/socket";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Route exact path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <ProfileProvider>
            <SocketHandler>
              <Navbar />
              <Route exact path="/"/>
              <PrivateRoute path="/me" component={ProfileSettings} />
              <Route exact path="/profiles/" component={ProfileListings} />
              <Route path="/profiles/:id" component={ProfileDetails} />
              <PrivateRoute exact path="/become-a-sitter" component={BecomeASitter} />
              <PrivateRoute exact path="/my-sitters" component={MySitters} />
              <PrivateRoute exact path="/my-jobs" component={MyJobs} />
              <PrivateRoute exact path="/messages" />
            </SocketHandler>
          </ProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
