import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";

const TopButton = ({ email }: { email: string }) => (
  <Button rightIcon={<ChevronDownIcon />}>
    <Text>{email}</Text>
  </Button>
);

const TopMenu = () => {
  const { logout, loggedIn, authDetails } = useContext(AuthContext);

  if (!loggedIn || !authDetails) return null;

  return (
    <Menu>
      <MenuButton>
        <TopButton email={authDetails?.email} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TopMenu;
