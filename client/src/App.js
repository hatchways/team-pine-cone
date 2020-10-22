import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from "./pages/ProfileDetails";

import { AuthProvider } from "./contexts/user";
import PrivateRoute from "./components/PrivateRoute/";
import { STRIPE_PUBLIC_KEY } from "./data/stripe";

const stripe = loadStripe(STRIPE_PUBLIC_KEY);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Elements stripe={stripe}>
          <AuthProvider>
            <Navbar />
            <Route exact path="/" />
            <Route exact path="/" />
            <Route exact path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/profiles/:id" component={ProfileDetails} />
            <PrivateRoute path="/me" component={ProfileSettings} />
            <PrivateRoute exact path="/become-a-sitter" />
            <PrivateRoute exact path="/my-sitters" />
            <PrivateRoute exact path="/my-jobs" />
            <PrivateRoute exact path="/messages" />
          </AuthProvider>
        </Elements>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
