import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const PreAdviceSidePanel = () => {
  const colors = useThemeColors();

  return (
    <Box bg={colors.tertiary} minW="225px">
      <VStack alignItems="start" p="20px 25px">
        <Heading fontSize="xl">Pre-Advice</Heading>
        <Button
          colorScheme="blue"
          leftIcon={<AddIcon />}
          fontSize="xs"
          size="sm"
        >
          Add New
        </Button>
      </VStack>
    </Box>
  );
};

export default PreAdviceSidePanel;
