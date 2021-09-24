import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotAdminWarningModal from "../../components/organisms/authentication/NotAdminWarningModal";

// Authenticated and wallet connected routes
const AuthenticatedConnected = () => (
  <>
    <Switch>
      <Route path="/dashboard">Connected</Route>
      <Redirect to="/dashboard" />
    </Switch>
    <NotAdminWarningModal />
  </>
);

export default AuthenticatedConnected;
