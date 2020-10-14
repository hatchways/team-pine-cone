import React from "react";
import { MuiThemeProvider, makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles()
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
      <div className={classes.root}>
        <Navbar />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/me" component={ProfileSettings} />
          <Route exact path="/become-a-sitter" component={LandingPage} />
          <Route exact path="/my-sitters" component={LandingPage} />
          <Route exact path="/my-jobs" component={LandingPage} />
          <Route exact path="/messages" component={LandingPage} />
      </div>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
