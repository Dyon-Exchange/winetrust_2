import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import ConnectWallet from "../auth/ConnectWallet";

// Authenticated but wallet not connected routes
const AuthenticatedNotConnected = () => (
  <Switch>
    <Route path="/connect-wallet">
      <ConnectWallet />
    </Route>
    <Redirect to="/connect-wallet" />
  </Switch>
);

export default AuthenticatedNotConnected;
