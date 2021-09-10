import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import NavBar from "./components/organisms/navbar/NavBar";
import Login from "./pages/auth/Login";

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  </Router>
);

export default App;
