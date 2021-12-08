import { Box, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

import AssetsTable from "./AssetsTable";

const WineTrustAssets = () => {
  const colors = useThemeColors();

  // state for the search query
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box bg={colors.primary} boxShadow="sm" flex="1" m="20px auto" maxW="80%">
      <HStack p="20px 40px" maxW="400px" minW="300px">
        <Input
          placeholder="Search"
          size="sm"
          value={searchQuery}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setSearchQuery(event.currentTarget.value)
          }
        />
      </HStack>
      <Box p="16px">
        <AssetsTable searchQuery={searchQuery} />
      </Box>
    </Box>
  );
};

export default WineTrustAssets;
