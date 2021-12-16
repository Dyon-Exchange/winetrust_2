import { Box } from "@chakra-ui/react";
import React from "react";

import WineTrustProducts from "../../components/organisms/products/WineTrustProducts";

const Products = () => (
  <Box display="flex" flexGrow={1} w="100%">
    <WineTrustProducts /> 
  </Box>
);

export default Products;