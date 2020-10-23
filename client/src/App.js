import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import Navbar from './components/Navbar';
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from './pages/ProfileDetails';
import ProfileListings from './pages/ProfileListings';

import { AuthProvider } from "./contexts/user";
import PrivateRoute from "./components/PrivateRoute/";
import { ProfileProvider } from "./contexts/profile";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Route exact path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <ProfileProvider>
            <Navbar />
            <Route exact path="/"/>
            <PrivateRoute path="/me" component={ProfileSettings} />
			<Route exact path="/profiles/" component={ProfileListings} />
            <Route exact path="/profiles/:id" component={ProfileDetails} />
            <PrivateRoute exact path="/become-a-sitter" />
            <PrivateRoute exact path="/my-sitters" />
            <PrivateRoute exact path="/my-jobs" />
            <PrivateRoute exact path="/messages" />
          </ProfileProvider>
        </AuthProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
