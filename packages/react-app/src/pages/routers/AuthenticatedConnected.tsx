import { Box } from "@chakra-ui/react";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotAdminWarningModal from "../../components/organisms/authentication/NotAdminWarningModal";
import PreAdviceSidePanel from "../../components/organisms/preAdvice/PreAdviceSidePanel";

// Authenticated and wallet connected routes
const AuthenticatedConnected = () => (
  <Box display="flex" flexGrow={1}>
    <PreAdviceSidePanel />
    <Switch>
      <Route exact path="/">
        Connected
      </Route>
      <Redirect to="/" />
    </Switch>
    <NotAdminWarningModal />
  </Box>
);

export default AuthenticatedConnected;
