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
