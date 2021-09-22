import { Box } from "@chakra-ui/react";
import React from "react";

import WineTrustData from "../../components/organisms/data/WineTrustData";

const Data = () => (
  <Box display="flex" flexGrow={1} px="15%" py="20px" w="100%">
    <WineTrustData />
  </Box>
);

export default Data;
