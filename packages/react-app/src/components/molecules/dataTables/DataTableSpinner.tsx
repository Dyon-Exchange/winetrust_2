import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

import useThemeColors from "../../../hooks/theme/useThemeColors";

const DataTableSpinner = () => {
  const colors = useThemeColors();

  return (
    <Center>
      <Spinner color={colors.primary} />
    </Center>
  );
};

export default DataTableSpinner;
