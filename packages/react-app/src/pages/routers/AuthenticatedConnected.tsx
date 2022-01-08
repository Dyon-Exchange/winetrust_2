
import {
  Box,
  VStack,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotAdminWarningModal from "../../components/organisms/authentication/NotAdminWarningModal";
import TabNav from "../../components/organisms/navigation/TabNav";
import PreAdviceSidePanel from "../../components/organisms/preAdvice/PreAdviceSidePanel";
import DataContextProvider from "../../contexts/DataContext";
import Assets from "../asset/Assets";
import Clients from "../client/Clients";
import Data from "../data/Data";
import Preadvices from "../preadvice/Preadivce";
import Products from "../product/Products";
import Warehouses from "../warehouse/Warehouses";



// Authenticated and wallet connected routes
const AuthenticatedConnected = () => {
  const width = useWindowWidth();
  const showPreAdviceSidePanel = width > 700;

  return (
    <Box display='flex' flexGrow={1}>
      <DataContextProvider>
        <>
          {/* Only show pre-advice side panel when window width is greater than 700 */}
          {/* {showPreAdviceSidePanel && <PreAdviceSidePanel />} */}
          <VStack flex='1'>
            <TabNav />
            <Switch>
              <Route exact path='/assets'>
                <Assets />
              </Route>
              <Route exact path='/warehouses'>
                <Warehouses />
              </Route>
              <Route exact path='/clients'>
                <Clients />
              </Route>
              <Route exact path='/products'>
                <Products />
              </Route>
              <Route exact path='/preadvices'>
                  <Preadvices />
              </Route>
              <Redirect to='/assets' />
            </Switch>
          </VStack>
        </>
      </DataContextProvider>

      <NotAdminWarningModal />
    </Box>
  );
};

export default AuthenticatedConnected;
