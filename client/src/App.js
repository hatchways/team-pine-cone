import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";


import CssBaseline from '@material-ui/core/CssBaseline'; // CSS Reset
import { theme } from "./themes/theme";
// import LandingPage from "./pages/Landing";
import SignUp from "./pages/SignUp"

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <Route path="/" component={SignUp} />
        </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
