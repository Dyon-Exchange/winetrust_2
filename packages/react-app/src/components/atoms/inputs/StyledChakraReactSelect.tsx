/* eslint-disable react/jsx-props-no-spreading */
import { Select } from "chakra-react-select";
import { ChakraSelectProps } from "chakra-react-select/dist/types/types";
import React from "react";

const StyledChakraReactSelect = (props: ChakraSelectProps) => (
  <Select
    backspaceRemovesValue
    isClearable
    openMenuOnClick={false}
    openMenuOnFocus={false}
    styles={{
      input: () => ({
        fontSize: "14px",
      }),
      placeholder: (base) => ({
        ...base,
        fontSize: "14px",
      }),
      singleValue: () => ({
        fontSize: "14px",
      }),
    }}
    {...props}
  />
);

export default StyledChakraReactSelect;
