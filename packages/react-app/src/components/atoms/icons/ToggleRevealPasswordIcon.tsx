import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from "react";

const ToggleRevealPasswordIcon = ({ reveal }: { reveal: boolean }) => {
  if (reveal) return <ViewOffIcon />;
  return <ViewIcon />;
};

export default ToggleRevealPasswordIcon;
