import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// Authenticated and wallet connected routes
const AuthenticatedConnected = () => (
  <Switch>
    <Route path="/dashboard">Connected</Route>
    <Redirect to="/dashboard" />
  </Switch>
);

export default AuthenticatedConnected;
