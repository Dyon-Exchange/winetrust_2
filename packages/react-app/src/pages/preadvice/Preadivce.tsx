import { Box } from "@chakra-ui/react";
import React from "react";

import WineTrustPreadvices from "../../components/organisms/preAdvice/WineTrustPreAdvice";

const Preadvices = () => (
  <Box display="flex" flexGrow={1} w="100%">
    <WineTrustPreadvices/>
  </Box>
);

export default Preadvices;