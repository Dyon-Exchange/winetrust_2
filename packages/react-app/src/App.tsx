import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import TopNavBar from "./components/organisms/navigation/TopNavBar";
import Login from "./pages/auth/Login";

const App = () => (
  <Router>
    <TopNavBar />
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Redirect to="/login" />
    </Switch>
  </Router>
);

export default App;
