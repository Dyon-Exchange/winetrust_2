import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
  IconButton,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useWindowWidth } from "@react-hook/window-size";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const StyledTabButton = styled(Tab)`
  width: 200px;
`;

const TabNav = () => {
  const colors = useThemeColors();
  const history = useHistory();
  const width = useWindowWidth();

  function getUrl(index: number): string {
    const urlTabs = [
      "/assets",
      "/clients",
      "/products",
      "/warehouses",
      "/preadvices",
    ];
    return urlTabs[index];
  }
  // push to history on tab change
  const handleTabChange = useCallback(
    (index: number) => {
      history.push(getUrl(index));
    },
    [history]
  );

  return (
    <Tabs onChange={handleTabChange} w="100%">
      <HStack bg="#002160" boxShadow="sm" justifyContent="space-between">
        <TabList bg="#002160">
          <StyledTabButton>
            <Text color="#FFFFFF">Assets</Text>
          </StyledTabButton>
          <StyledTabButton>
            <Text color="#FFFFFF">Users</Text>
          </StyledTabButton>
          <StyledTabButton>
            <Text color="#FFFFFF">Products</Text>
          </StyledTabButton>
          <StyledTabButton>
            <Text color="#FFFFFF">Warehouses</Text>
          </StyledTabButton>
          <StyledTabButton>
            <Text color="#FFFFFF">Pre-Advices</Text>
          </StyledTabButton>
        </TabList>
        {/* Show hamburger button when pre-advice side panel shrinks */}
        {width <= 700 && (
          <IconButton
            aria-label="Open pre-advice panel"
            bg={colors.secondary}
            icon={<HamburgerIcon />}
          />
        )}
      </HStack>
    </Tabs>
  );
};

export default TabNav;
