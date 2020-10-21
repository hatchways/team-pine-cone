import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";

import "./App.css";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from './pages/ProfileDetails';
import ProfileListings from './pages/ProfileListings';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/" component={ProfileSettings} />
        <Route path="/me" component={ProfileSettings} />
        <Route path="/profile-details" component={ProfileDetails} />
        <Route exact path="/become-a-sitter" component={ProfileSettings} />
		<Route exact path="/profile/listings" component={ProfileListings} />
        <Route exact path="/my-sitters" component={ProfileSettings} />
        <Route exact path="/my-jobs" component={ProfileSettings} />
        <Route exact path="/messages" component={ProfileSettings} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
