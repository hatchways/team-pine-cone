import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import { theme } from "./themes/theme";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

import "./App.css";
import Navbar from "./components/Navbar";
import ProfileSettings from "./pages/ProfileSettings";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileListings from "./pages/ProfileListings";
import BecomeASitter from "./pages/BecomeASitter";
import { AuthProvider } from "./contexts/user";
import PrivateRoute from "./components/PrivateRoute/";
import ProfileProvider from "./contexts/profile";
import MySitters from "./pages/MySitters";
import MyJobs from "./pages/MyJobs";
import SocketHandler from "./contexts/socket";
import { STRIPE_PUBLIC_KEY } from "./data/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripe = loadStripe(STRIPE_PUBLIC_KEY);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Elements stripe={stripe}>
          <AuthProvider>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <ProfileProvider>
              <SocketHandler>
              <Navbar />
              <Route exact path="/" component={ProfileListings}/>
              <PrivateRoute path="/me" component={ProfileSettings} />
              <Route exact path="/profiles/" component={ProfileListings} />
              <Route path="/profiles/:id" component={ProfileDetails} />
              <PrivateRoute exact path="/become-a-sitter" component={BecomeASitter} />
              <PrivateRoute exact path="/my-sitters" component={MySitters} />
              <PrivateRoute exact path="/my-jobs" component={MyJobs} />
              <PrivateRoute exact path="/messages" />
            </SocketHandler>
            </ProfileProvider>
          </AuthProvider>
        </Elements>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
