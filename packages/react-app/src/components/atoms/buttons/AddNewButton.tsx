/* eslint-disable react/jsx-props-no-spreading */
import { AddIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

const AddNewButton = (props: ButtonProps) => (
  <Button
    colorScheme="blue"
    leftIcon={<AddIcon />}
    fontSize="xs"
    minW="100px"
    size="sm"
    {...props}
  >
    Add New
  </Button>
);

export default AddNewButton;
