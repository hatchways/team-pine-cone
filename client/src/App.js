import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/me" component={ProfileSettings} />
          <Route exact path="/become-a-sitter" component={LandingPage} />
          <Route exact path="/my-sitters" component={LandingPage} />
          <Route exact path="/my-jobs" component={LandingPage} />
          <Route exact path="/messages" component={LandingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
