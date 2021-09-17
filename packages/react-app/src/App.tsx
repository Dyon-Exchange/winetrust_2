/* eslint-disable @shopify/jsx-no-complex-expressions */
import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
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
import Login from "./pages/auth/Login";

const App = () => {
  const { loggedIn } = useContext(AuthContext);
  const { userDetails, connect } = useContext(WalletContext);

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
            <Route exact path="/">
              <Center my="100px">
                <VStack>
                  <Button colorScheme="blue" onClick={connect}>
                    Connect
                  </Button>
                  {userDetails && (
                    <VStack>
                      <Text>{`User address: ${userDetails.address}`}</Text>
                      <Text>{`User balance: ${userDetails.balance}`}</Text>
                    </VStack>
                  )}
                </VStack>
              </Center>
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </Router>
    </Box>
  );
};
export default App;
