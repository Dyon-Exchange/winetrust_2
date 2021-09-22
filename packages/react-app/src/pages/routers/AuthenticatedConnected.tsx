import { Box, VStack } from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotAdminWarningModal from "../../components/organisms/authentication/NotAdminWarningModal";
import TabNav from "../../components/organisms/navigation/TabNav";
import PreAdviceSidePanel from "../../components/organisms/preAdvice/PreAdviceSidePanel";

// Authenticated and wallet connected routes
const AuthenticatedConnected = () => {
  const width = useWindowWidth();

  return (
    <Box display="flex" flexGrow={1}>
      {/* Only show pre-advice side panel when window width is greater than 700 */}
      {width > 700 && <PreAdviceSidePanel />}
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
};

export default AuthenticatedConnected;
