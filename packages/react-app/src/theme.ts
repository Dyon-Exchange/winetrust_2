import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    primary: {
      light: "#2B6CB0",
      dark: "#2A4365",
    },
    secondary: {
      light: "#FFFFFF",
      dark: "#4A5568",
    },
    tertiary: {
      light: "#E2E8F0",
      dark: "#2D3748",
    },
    error: {
      light: "#E53E3E",
      dark: "#FC8181",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode("#F7FAFC", "#1A202C")(props),
      },
    }),
  },
});

export default theme;
