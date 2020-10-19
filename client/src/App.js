import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";

function CheckIfSignedIn() {
  return <Redirect to="/signup" />
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
          <Route exact path="/" component={CheckIfSignedIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        <Route path="/me" component={ProfileSettings} />
        <Route exact path="/become-a-sitter" component={ProfileSettings} />
        <Route exact path="/my-sitters" component={ProfileSettings} />
        <Route exact path="/my-jobs" component={ProfileSettings} />
        <Route exact path="/messages" component={ProfileSettings} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
