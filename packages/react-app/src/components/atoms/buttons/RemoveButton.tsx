/* eslint-disable react/jsx-props-no-spreading */
import { CloseIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

const RemoveButton = (props: ButtonProps) => (
  <Button
    colorScheme='red'
    variant='outline'
    leftIcon={<CloseIcon />}
    fontSize='xs'
    minW='100px'
    size='sm'
    {...props}>
    Remove
  </Button>
);

export default RemoveButton;
