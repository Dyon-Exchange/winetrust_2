import { ModalHeader } from "@chakra-ui/react";
import { styled } from "@material-ui/styles";
import React from "react";

// min height and max height takes into account the top bar

const StyledModalHeader = styled(ModalHeader)({
    background: "rgba(49, 130, 206, 0.5);",
    color: "#fff;"
});

export default StyledModalHeader;
