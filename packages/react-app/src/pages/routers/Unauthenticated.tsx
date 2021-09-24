import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Login from "../auth/Login";

// Unauthenticated routes
const Unauthenticated = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Redirect to="/login" />
  </Switch>
);

export default Unauthenticated;
