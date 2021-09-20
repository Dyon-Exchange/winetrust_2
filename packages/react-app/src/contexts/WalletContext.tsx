import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import React, { createContext, ReactNode, useEffect, useState } from "react";

import { convertWeiToNumber } from "../helpers/ethers/convertValue";

interface UserDetails {
  address: string;
  balance: number;
}

interface IWalletContext {
  userDetails?: UserDetails;
  provider?: providers.Web3Provider;
  initialising: boolean;
  walletConnected: boolean;
  connect: () => Promise<void>;
}

const INITIAL_WALLET_CONTEXT = {
  userDetails: undefined,
  provider: undefined,
  initialising: true,
  walletConnected: false,
  connect: async () => {},
};

export const WalletContext = createContext<IWalletContext>(
  INITIAL_WALLET_CONTEXT
);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // loading state for initialising the context
  const [initialising, setInitialising] = useState(true);

  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();

  const walletConnected =
    userDetails !== undefined && provider !== undefined && !initialising;

  const connect = async () => {
    const webProvider = (await detectEthereumProvider({
      mustBeMetaMask: true,
    })) as providers.ExternalProvider | providers.JsonRpcFetchFunc;

    const initialisedProvider = new providers.Web3Provider(webProvider);
    const [address] = await initialisedProvider.send("eth_requestAccounts", []);
    const balance = await initialisedProvider.getBalance(address);

    setProvider(initialisedProvider);
    setUserDetails({
      address,
      balance: convertWeiToNumber(balance.toString()),
    });
  };

  // automatically connect metamask account if one is already connected
  useEffect(() => {
    (async () => {
      const webProvider = (await detectEthereumProvider({
        mustBeMetaMask: true,
      })) as providers.ExternalProvider | providers.JsonRpcFetchFunc;

      const initialisedProvider = new providers.Web3Provider(webProvider);
      const accounts = await initialisedProvider.listAccounts();

      // if any accounts exists call the connect function
      if (accounts.length > 0) {
        await connect();
      }

      // set initialising to false
      setInitialising(false);
    })();
  }, []);

  return (
    <WalletContext.Provider
      value={{ userDetails, provider, initialising, walletConnected, connect }}
    >
      {children}
    </WalletContext.Provider>
  );
};
