import {
  Box,
  HStack,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";

import AddNewWarehouseFormModal from "./warehouses/AddNewWarehouseFormModal";

const WineTrustData = () => {
  const colors = useThemeColors();

  // state for the tab index
  const [tabIndex, setTabIndex] = useState(0);

  // states for the add new modals
  const {
    isOpen: isAddNewWarehouseOpen,
    onOpen: openAddNewWarehouse,
    onClose: closeAddNewWarehouse,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  // tab change handler
  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  // open add new handler
  const openAddNew = () => {
    // open the appropriate add new modal
    if (tabIndex === 0) openAddNewWarehouse();
  };

  return (
    <>
      <Box bg={colors.secondary} boxShadow="sm" flex="1">
        <Tabs index={tabIndex} onChange={handleTabChange}>
          <HStack justifyContent="space-between" p="10px 20px" w="100%">
            <TabList>
              <Tab>Warehouses</Tab>
              <Tab>Clients</Tab>
              <Tab>Products</Tab>
            </TabList>
            <AddNewButton onClick={openAddNew} />
          </HStack>
        </Tabs>
      </Box>

      {/* Add new modals */}
      {/* only render the modals when their open states ar true, so that useForm hook resets */}
      {isAddNewWarehouseOpen && (
        <AddNewWarehouseFormModal
          isOpen={isAddNewWarehouseOpen}
          onClose={closeAddNewWarehouse}
        />
      )}
    </>
  );
};

export default WineTrustData;
