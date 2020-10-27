import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute/";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileListings from "./pages/ProfileListings";
import BecomeASitter from "./pages/BecomeASitter";
import PaymentSuccess from "./pages/PaymentSuccess";

import { AuthProvider } from "./contexts/user";
import ProfileProvider from "./contexts/profile";
import { STRIPE_PUBLIC_KEY } from "./data/stripe";

const stripe = loadStripe(STRIPE_PUBLIC_KEY);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Elements stripe={stripe}>
          <AuthProvider>
            <Route exact path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <ProfileProvider>
              <Navbar />
              <Route exact path="/" />
              <PrivateRoute path="/me" component={ProfileSettings} />
              <Route exact path="/profiles/" component={ProfileListings} />
              <Route path="/profiles/:id" component={ProfileDetails} />
              <PrivateRoute
                exact
                path="/payment/success"
                component={PaymentSuccess}
              />
              <PrivateRoute
                exact
                path="/become-a-sitter"
                component={BecomeASitter}
              />
              <PrivateRoute exact path="/my-sitters" />
              <PrivateRoute exact path="/my-jobs" />
              <PrivateRoute exact path="/messages" />
            </ProfileProvider>
          </AuthProvider>
        </Elements>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
