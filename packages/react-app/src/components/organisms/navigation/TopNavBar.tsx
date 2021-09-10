import {
  Divider,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const TopNavBar = () => {
  // light mode and dark mode background colors for the whole app
  const themeBackgroundColor = useColorModeValue("blue.600", "blue.800");

  return (
    <HStack
      bgColor={themeBackgroundColor}
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
