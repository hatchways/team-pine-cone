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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/me" component={LandingPage} />
		<Route exact path="/me/edit" component={ProfileEdit} />
        <Route exact path="/become-a-sitter" component={LandingPage} />
        <Route exact path="/my-sitters" component={LandingPage} />
        <Route exact path="/my-jobs" component={LandingPage} />
        <Route exact path="/messages" component={LandingPage} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
