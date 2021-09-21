import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import { convertWeiToNumber } from "../helpers/ethers/convertValue";

interface IWalletContext {
  userDetails?: UserDetails;
  provider?: providers.Web3Provider;
  initialising: boolean;
  isMetaMaskInstalled?: boolean;
  walletConnected: boolean;
  connectAccount: () => Promise<void>;
}

const INITIAL_WALLET_CONTEXT = {
  userDetails: undefined,
  provider: undefined,
  initialising: true,
  isMetaMaskInstalled: undefined,
  walletConnected: false,
  connectAccount: async () => {},
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

  const isMetaMaskInstalled = window.ethereum?.isMetaMask;

  const walletConnected =
    userDetails !== undefined && provider !== undefined && !initialising;

  // will setup wallet context to the currently selected metamask account
  const connectAccount = async () => {
    const webProvider = (await detectEthereumProvider({
      mustBeMetaMask: true,
    })) as providers.ExternalProvider | providers.JsonRpcFetchFunc;

    const ethersProvider = new providers.Web3Provider(webProvider);
    const [address] = await ethersProvider.send("eth_requestAccounts", []);

    const balance = await ethersProvider.getBalance(address);

    setProvider(ethersProvider);
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

      // early return if metamask isn't installed or enabled
      if (!webProvider) {
        // set initialising to false
        setInitialising(false);
        return;
      }

      const initialisedProvider = new providers.Web3Provider(webProvider);
      const accounts = await initialisedProvider.listAccounts();

      // if any accounts exists call the connect function
      if (accounts.length > 0) {
        await connectAccount();
      }

      // set initialising to false
      setInitialising(false);
    })();
  }, []);

  // set up metamask account change event listener
  useEffect(() => {
    if (!window.ethereum) return;
    (window.ethereum as any).on("accountsChanged", async () => {
      // setup wallet context again with the new selected account
      setInitialising(true);
      await connectAccount();
      setInitialising(false);
    });
  }, []);

  return (
    <WalletContext.Provider
      value={{
        userDetails,
        provider,
        initialising,
        isMetaMaskInstalled,
        walletConnected,
        connectAccount,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
