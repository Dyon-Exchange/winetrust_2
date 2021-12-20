import { HamburgerIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Tab, TabList, Tabs, useColorModeValue, Text } from "@chakra-ui/react";
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

  function getUrl(index: number) : string{
    const urlTabs = ["/assets","/clients","/products","/warehouses","/preadvices"]
    return urlTabs[index]
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
      <HStack
        bg={colors.secondary}
        boxShadow="sm"
        justifyContent="space-between"
      >
        <TabList>
          <StyledTabButton><Text color="#002160">Assets</Text></StyledTabButton>
          <StyledTabButton><Text color="#002160">Clients</Text></StyledTabButton>
          <StyledTabButton><Text color="#002160">Products</Text></StyledTabButton>
          <StyledTabButton><Text color="#002160">Warehouse</Text></StyledTabButton>
          <StyledTabButton><Text color="#002160">Pre-Advices</Text></StyledTabButton>
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
