import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from './pages/ProfileDetails';

import { AuthProvider } from "./contexts/user";
import PrivateRoute from "./components/PrivateRoute/";


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={ProfileSettings} />
        <Route path="/me" component={ProfileSettings} />
        <Route path="/profile-details" component={ProfileDetails} />
        <Route exact path="/become-a-sitter" component={ProfileSettings} />
        <Route exact path="/my-sitters" component={ProfileSettings} />
        <Route exact path="/my-jobs" component={ProfileSettings} />
        <Route exact path="/messages" component={ProfileSettings} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
