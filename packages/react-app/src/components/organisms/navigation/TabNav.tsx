import { HamburgerIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Tab, TabList, Tabs } from "@chakra-ui/react";
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

  // push to history on tab change
  const handleTabChange = useCallback(
    (index: number) => {
      history.push(index === 0 ? "/assets" : "/data");
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
          <StyledTabButton>Assets</StyledTabButton>
          <StyledTabButton>Data</StyledTabButton>
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
