import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import theme from "./theme";

const AppThemeWrapper = () => (
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

ReactDOM.render(<AppThemeWrapper />, document.getElementById("root"));
