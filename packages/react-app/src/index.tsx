import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import theme from "./theme";

axios.defaults.baseURL = "http://localhost:3030/";

const AppThemeWrapper = () => (
  <React.StrictMode>
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

ReactDOM.render(<AppThemeWrapper />, document.getElementById("root"));
