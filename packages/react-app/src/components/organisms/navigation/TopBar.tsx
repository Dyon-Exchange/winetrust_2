import { Divider, Heading, HStack, Text } from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const TopBar = () => {
  const colors = useThemeColors();
  const width = useWindowWidth();

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
        {/* responsiveness */}
        {width > 500 && (
          <>
            <Divider orientation="vertical" />
            <Text color="white" fontSize="medium" noOfLines={1}>
              Inventory Management System
            </Text>
          </>
        )}
      </HStack>
    </HStack>
  );
};

export default TopBar;
