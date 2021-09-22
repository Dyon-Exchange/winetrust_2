import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";
import AddNewButton from "../../atoms/buttons/AddNewButton";

const PreAdviceSidePanel = () => {
  const colors = useThemeColors();

  return (
    <Box bg={colors.tertiary} minW="225px">
      <VStack alignItems="start" p="20px 25px">
        <Heading fontSize="xl">Pre-Advice</Heading>
        <AddNewButton />
      </VStack>
    </Box>
  );
};

export default PreAdviceSidePanel;
