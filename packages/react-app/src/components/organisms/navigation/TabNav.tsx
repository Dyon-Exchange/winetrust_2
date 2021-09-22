import { Tab, TabList, Tabs } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { useHistory } from "react-router-dom";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const StyledTabButton = styled(Tab)`
  width: 200px;
`;

const TabNav = () => {
  const colors = useThemeColors();
  const history = useHistory();

  // push to history on tab change
  const handleTabChange = (index: number) => {
    history.push(index === 0 ? "/assets" : "/data");
  };

  return (
    <Tabs bg={colors.secondary} onChange={handleTabChange} w="100%">
      <TabList>
        <StyledTabButton w="200px">Assets</StyledTabButton>
        <StyledTabButton>Data</StyledTabButton>
      </TabList>
    </Tabs>
  );
};

export default TabNav;
