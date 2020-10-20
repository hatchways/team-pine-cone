import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileEdit from './components/ProfileEdit';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" />
        <Route exact path="/me" component={ProfileSettings} />
		<Route exact path="/me/profile-edit" component={ProfileEdit} />
        <Route exact path="/become-a-sitter" />
        <Route exact path="/my-sitters" />
        <Route exact path="/my-jobs" />
        <Route exact path="/messages" />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
