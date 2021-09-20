/* eslint-disable no-nested-ternary */
/* eslint-disable @shopify/jsx-no-complex-expressions */
import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import TopNavBar from "./components/organisms/navigation/TopNavBar";
import { AuthContext } from "./contexts/AuthContext";
import { WalletContext } from "./contexts/WalletContext";
import AuthenticatedConnected from "./pages/routers/AuthenticatedConnected";
import AuthenticatedNotConnected from "./pages/routers/AuthenticatedNotConnected";
import Unauthenticated from "./pages/routers/Unauthenticated";

const App = () => {
  const { loggedIn } = useContext(AuthContext);
  const { walletConnected } = useContext(WalletContext);

  return (
    // min height inherit so that the app will always fill the window height
    <Box minH="inherit">
      <Router>
        <TopNavBar />
        {!loggedIn ? (
          <Unauthenticated />
        ) : walletConnected ? (
          <AuthenticatedConnected />
        ) : (
          <AuthenticatedNotConnected />
        )}
      </Router>
    </Box>
  );
};
export default App;
