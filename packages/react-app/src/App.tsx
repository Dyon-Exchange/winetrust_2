import { Box } from "@chakra-ui/react";
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

const App = () => (
  // min height inherit so that the app will always fill the window height
  <Box minHeight="inherit">
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
export default App;
