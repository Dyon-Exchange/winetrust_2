import {
  Box,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";

import AddNewClientFormModal from "./clients/AddNewClientFormModal";
import AddNewProductFormModal from "./products/AddNewProductFormModal";
import AddNewWarehouseFormModal from "./warehouses/AddNewWarehouseFormModal";
import WarehousesTable from "./warehouses/WarehousesTable";

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

  const {
    isOpen: isAddNewClientOpen,
    onOpen: openAddNewClient,
    onClose: closeAddNewClient,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const {
    isOpen: isAddNewProductOpen,
    onOpen: openAddNewProduct,
    onClose: closeAddNewProduct,
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
    if (tabIndex === 1) openAddNewClient();
    if (tabIndex === 2) openAddNewProduct();
  };

  return (
    <>
      <Box
        bg={colors.secondary}
        boxShadow="sm"
        flex="1"
        m="20px auto"
        maxW="80%"
      >
        <Tabs index={tabIndex} onChange={handleTabChange}>
          <HStack justifyContent="space-between" p="10px 20px" w="100%">
            <TabList>
              <Tab>Warehouses</Tab>
              <Tab>Clients</Tab>
              <Tab>Products</Tab>
            </TabList>
            <AddNewButton onClick={openAddNew} />
          </HStack>

          <TabPanels>
            <TabPanel>
              <WarehousesTable />
            </TabPanel>
            <TabPanel>Clients</TabPanel>
            <TabPanel>Products</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* Add new modals */}
      {/* only render the modals when their open states are true, so that useForm hook resets */}
      {isAddNewWarehouseOpen && (
        <AddNewWarehouseFormModal
          isOpen={isAddNewWarehouseOpen}
          onClose={closeAddNewWarehouse}
        />
      )}
      {isAddNewClientOpen && (
        <AddNewClientFormModal
          isOpen={isAddNewClientOpen}
          onClose={closeAddNewClient}
        />
      )}
      {isAddNewProductOpen && (
        <AddNewProductFormModal
          isOpen={isAddNewProductOpen}
          onClose={closeAddNewProduct}
        />
      )}
    </>
  );
};

export default WineTrustData;
