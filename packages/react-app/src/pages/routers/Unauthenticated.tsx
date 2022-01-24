import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ForgotPassword from "../auth/ForgotPassword";
import Login from "../auth/Login";
import Signup from "../auth/Signup";


// Unauthenticated routes
const Unauthenticated = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/forgotpassword">
      <ForgotPassword />
    </Route>
    <Redirect to="/login" />
  </Switch>
);

export default Unauthenticated;
