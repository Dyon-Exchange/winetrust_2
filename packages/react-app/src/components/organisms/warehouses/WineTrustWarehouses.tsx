import { Box, HStack, Input, useColorModeValue } from "@chakra-ui/react";
import React, { useCallback, useState, useContext } from "react";

import { DataContext } from "../../../contexts/DataContext";
import useThemeColors from "../../../hooks/theme/useThemeColors";

import WarehousesTable from "./WarehousesTable";

const WineTrustWarehouses = () => {
  const colors = useThemeColors();
  const { assets } = useContext(DataContext);
  const [deleteList, setDeleteList] = useState<string[]>([]);

  return (
    <Box bg={colors.secondary} boxShadow="sm" flex="1" m="20px auto" maxW="80%">
      <Box p="16px">
        <WarehousesTable setDeleteList={setDeleteList} assets={assets} />
      </Box>
    </Box>
  );
};

export default WineTrustWarehouses;
