import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import chakraTheme from "./chakraTheme";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WalletContextProvider } from "./contexts/WalletContext";
import materialTheme from "./materialTheme";

const AppThemeWrapper = () => {
  // initialise a new react query client object
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <WalletContextProvider>
            <MuiThemeProvider theme={materialTheme}>
              <ChakraProvider theme={chakraTheme}>
                <ColorModeScript
                  initialColorMode={chakraTheme.config.initialColorMode}
                />
                <App />
              </ChakraProvider>
            </MuiThemeProvider>
          </WalletContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppThemeWrapper />, document.getElementById("root"));
