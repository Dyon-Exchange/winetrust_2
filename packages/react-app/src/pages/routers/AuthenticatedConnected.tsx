import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotAdminWarningModal from "../../components/organisms/authentication/NotAdminWarningModal";
import TabNav from "../../components/organisms/navigation/TabNav";
import PreAdviceSidePanel from "../../components/organisms/preAdvice/PreAdviceSidePanel";

// Authenticated and wallet connected routes
const AuthenticatedConnected = () => (
  <Box display="flex" flexGrow={1}>
    <PreAdviceSidePanel />
    <VStack flex="1">
      <TabNav />
      <Switch>
        <Route exact path="/assets">
          Assets
        </Route>
        <Route exact path="/data">
          Data
        </Route>
        <Redirect to="/assets" />
      </Switch>
    </VStack>
    <NotAdminWarningModal />
  </Box>
);

export default AuthenticatedConnected;
