import { Divider, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const TopNavBar = () => {
  const colors = useThemeColors();

  return (
    <HStack
      bg={colors.primary}
      px="50px"
      py="10px"
      justifyContent="space-between"
    >
      <HStack h="50px" spacing="15px">
        <Heading color="white" fontSize="2xl">
          WineTrust
        </Heading>
        <Divider orientation="vertical" />
        <Text color="white" fontSize="medium">
          Inventory Management System
        </Text>
      </HStack>
    </HStack>
  );
};

export default TopNavBar;
