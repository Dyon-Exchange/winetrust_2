import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import React, { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

const TopMenu = () => {
  const { logout, loggedIn, authDetails } = useContext(AuthContext);

  if (!loggedIn) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {authDetails?.email}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TopMenu;
