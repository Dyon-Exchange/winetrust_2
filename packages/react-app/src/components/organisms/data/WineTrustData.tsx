import { Box, HStack, Tab, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";

const WineTrustData = () => {
  const colors = useThemeColors();

  return (
    <Box bg={colors.secondary} boxShadow="sm" flex="1">
      <Tabs>
        <HStack justifyContent="space-between" p="10px 20px" w="100%">
          <TabList>
            <Tab>Warehouses</Tab>
            <Tab>Clients</Tab>
            <Tab>Products</Tab>
          </TabList>
          <AddNewButton />
        </HStack>
      </Tabs>
    </Box>
  );
};

export default WineTrustData;
