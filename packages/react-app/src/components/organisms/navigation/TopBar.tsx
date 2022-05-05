import { Divider, Heading, HStack, Text, Image } from "@chakra-ui/react";
import { useWindowWidth } from "@react-hook/window-size";
import React from "react";

import WineTrustLogoPNG from "../../../assets/icons/img/WineTrust_Final.png";
import useThemeColors from "../../../hooks/theme/useThemeColors";

import TopMenu from "./TopMenu";

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
        <Image alt="" src={WineTrustLogoPNG} w="15%" />
        {/* responsiveness */}
        {width > 500 && (
          <>
            <Divider orientation="vertical" />
            <Text color="white" fontSize="20px" noOfLines={1}>
              Inventory Management System
            </Text>
          </>
        )}
      </HStack>
      <TopMenu />
    </HStack>
  );
};

export default TopBar;
