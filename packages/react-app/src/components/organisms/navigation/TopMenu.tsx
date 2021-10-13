import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React, { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

const TopMenu = () => {
  const { logout, loggedIn, authDetails } = useContext(AuthContext);

  if (!loggedIn || !authDetails) return null;

  return (
    <Menu>
      <MenuButton color="white">
        {authDetails?.email}
        <ChevronDownIcon color="white" ml="10px" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TopMenu;
