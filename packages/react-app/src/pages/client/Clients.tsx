import { Box } from "@chakra-ui/react";
import React from "react";

import WineTrustClients from "../../components/organisms/clients/WineTrustClients";

const Client = () => (
  <Box display="flex" flexGrow={1} w="100%">
    <WineTrustClients/>
  </Box>
);

export default Client;
