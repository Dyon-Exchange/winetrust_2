/* eslint-disable react/jsx-props-no-spreading */
import { ViewIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

const ViewProductsButton = (props: ButtonProps) => (
  <Button
    colorScheme="blue"
    leftIcon={<ViewIcon />}
    fontSize="xs"
    minW="100px"
    size="sm"
    {...props}
  >
    View Products
  </Button>
);

export default ViewProductsButton;
