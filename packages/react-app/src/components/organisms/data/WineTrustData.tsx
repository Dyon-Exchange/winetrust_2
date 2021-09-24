import {
  Box,
  HStack,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";

import AddNewWarehouseFormModal from "./warehouses/AddNewWarehouseFormModal";

const WineTrustData = () => {
  const colors = useThemeColors();

  // states for the add new modals
  const {
    isOpen: isAddNewWarehouseOpen,
    onOpen: openAddNewWarehouse,
    onClose: closeAddNewWarehouse,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  return (
    <>
      <Box bg={colors.secondary} boxShadow="sm" flex="1">
        <Tabs>
          <HStack justifyContent="space-between" p="10px 20px" w="100%">
            <TabList>
              <Tab>Warehouses</Tab>
              <Tab>Clients</Tab>
              <Tab>Products</Tab>
            </TabList>
            <AddNewButton onClick={openAddNewWarehouse} />
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
