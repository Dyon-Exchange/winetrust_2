import { chakra, ModalHeader } from "@chakra-ui/react";
import { Box } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";

// min height and max height takes into account the top bar

const StyledBox = styled(Box)({
    width: "100%",
    display: "flex"
});
const StyledText = styled(chakra.span)({
      color: "var(--chakra-colors-gray-600);",
      "font-size": "15px",
      width: "73%"
})
const StyledLabel = styled(chakra.span)({
      width: "25%"
})
const StyledSeparator = styled(chakra.span)({
      width: "2%"
})

export  { StyledBox, StyledText, StyledLabel, StyledSeparator }
