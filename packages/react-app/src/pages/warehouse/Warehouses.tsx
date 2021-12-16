import { Box } from "@chakra-ui/react";
import React from "react";

import WineTrustWarehouses from "../../components/organisms/warehouses/WineTrustWarehouses";

const Warehouses = () => (
  <Box display="flex" flexGrow={1} w="100%">
    <WineTrustWarehouses/>
  </Box>
);

export default Warehouses;