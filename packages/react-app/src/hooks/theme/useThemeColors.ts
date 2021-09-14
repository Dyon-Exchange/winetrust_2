// Created another use theme colors hook instead of just using chakra's existing use theme hook
// to return light mode and dark mode theme colors using chakra's use color mode hook

import { useColorModeValue } from "@chakra-ui/react";

interface ThemeColorsState {
  primary: string;
  secondary: string;
  error: string;
}

const useThemeColors = (): ThemeColorsState => {
  const primary = useColorModeValue("primary.light", "primary.dark");
  const secondary = useColorModeValue("secondary.light", "secondary.dark");
  const error = useColorModeValue("error.light", "error.dark");

  return {
    primary,
    secondary,
    error,
  };
};

export default useThemeColors;
