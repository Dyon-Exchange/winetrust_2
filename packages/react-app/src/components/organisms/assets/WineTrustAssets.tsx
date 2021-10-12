import { Box, HStack, Input } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

import AssetsTable from "./AssetsTable";

const WineTrustAssets = () => {
  const colors = useThemeColors();

  return (
    <Box bg={colors.secondary} boxShadow="sm" flex="1" m="20px auto" maxW="80%">
      <HStack p="20px 40px" maxW="400px" minW="300px">
        <Input placeholder="Search" size="sm" />
      </HStack>
      <Box p="16px">
        <AssetsTable searchQuery="" />
      </Box>
    </Box>
  );
};

export default WineTrustAssets;
