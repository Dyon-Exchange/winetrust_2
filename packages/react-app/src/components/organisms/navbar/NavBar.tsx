/* eslint-disable react/jsx-boolean-value */
import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

import Text from "../../atoms/Text";

const NavBar = () => (
  <AppBar>
    <Toolbar>
      <Text bold variant="h5">
        WineTrust
      </Text>
    </Toolbar>
  </AppBar>
);

export default NavBar;
