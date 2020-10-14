import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";


import CssBaseline from '@material-ui/core/CssBaseline'; // CSS Reset
import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
