import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import TopNavBar from "./components/organisms/navigation/TopNavBar";
import Login from "./pages/auth/Login";

import "./App.css";

const App = () => {
  // light mode and dark mode background colors for the whole app
  const themeBackgroundColor = useColorModeValue("gray.50", "gray.800");

  return (
    // min height inherit so that the app wil always fill the window height
    <Box bg={themeBackgroundColor} minHeight="inherit">
      <Router>
        <TopNavBar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </Router>
    </Box>
  );
};

export default App;
