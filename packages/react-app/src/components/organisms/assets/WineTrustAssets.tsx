import { Box, HStack, Input } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

import AssetsTable from "./AssetsTables";

const WineTrustAssets = () => {
  const colors = useThemeColors();

  return (
    <Box bg={colors.secondary} boxShadow="sm" flex="1" m="20px auto" maxW="80%">
      <HStack p="10px 20px" maxW="400px" minW="300px">
        <Input placeholder="Search" size="sm" />
      </HStack>
      <AssetsTable />
    </Box>
  );
};

export default WineTrustAssets;
