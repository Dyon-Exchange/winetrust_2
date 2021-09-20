/* eslint-disable no-nested-ternary */
/* eslint-disable @shopify/jsx-no-complex-expressions */
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import "./App.css";
import TopNavBar from "./components/organisms/navigation/TopNavBar";
import { AuthContext } from "./contexts/AuthContext";
import { WalletContext } from "./contexts/WalletContext";
import ConnectWallet from "./pages/auth/ConnectWallet";
import Login from "./pages/auth/Login";

const App = () => {
  const { loggedIn } = useContext(AuthContext);
  const { walletConnected } = useContext(WalletContext);

  return (
    // min height inherit so that the app will always fill the window height
    <Box minH="inherit">
      <Router>
        <TopNavBar />
        {!loggedIn ? (
          <Switch>
            {/* Unauthenticated routes */}
            <Route path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </Switch>
        ) : walletConnected ? (
          <Switch>
            {/* Authenticated and wallet connected routes */}
            <Route path="/dashboard">Connected</Route>
            <Redirect to="/dashboard" />
          </Switch>
        ) : (
          <Switch>
            {/* Authenticated and no wallet connected routes */}
            <Route path="/connect-wallet">
              <ConnectWallet />
            </Route>
            <Redirect to="/connect-wallet" />
          </Switch>
        )}
      </Router>
    </Box>
  );
};
export default App;
