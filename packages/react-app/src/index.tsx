import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WalletContextProvider } from "./contexts/WalletContext";
import theme from "./theme";

const AppThemeWrapper = () => (
  <React.StrictMode>
    <WalletContextProvider>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </AuthContextProvider>
    </WalletContextProvider>
  </React.StrictMode>
);

ReactDOM.render(<AppThemeWrapper />, document.getElementById("root"));
