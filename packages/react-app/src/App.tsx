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
import ConnectWallet from "./pages/auth/ConnectWallet";
import Login from "./pages/auth/Login";

const App = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    // min height inherit so that the app will always fill the window height
    <Box minH="inherit">
      <Router>
        <TopNavBar />
        {!loggedIn ? (
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Redirect to="/login" />
          </Switch>
        ) : (
          <Switch>
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
