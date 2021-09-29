import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { WalletContextProvider } from "./contexts/WalletContext";
import theme from "./theme";

const AppThemeWrapper = () => {
  // initialise a new react query client object
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <WalletContextProvider>
          <AuthContextProvider>
            <ChakraProvider theme={theme}>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <App />
            </ChakraProvider>
          </AuthContextProvider>
        </WalletContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppThemeWrapper />, document.getElementById("root"));
