import { Box } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const WineTrustData = () => {
  const colors = useThemeColors();

  return <Box bg={colors.secondary} boxShadow="sm" flex="1" />;
};

export default WineTrustData;
