import detectEthereumProvider from "@metamask/detect-provider";
import { providers } from "ethers";
import React, { createContext, ReactNode, useState } from "react";

import { convertWeiToNumber } from "../helpers/ethers/convertValue";

interface UserDetails {
  address: string;
  balance: number;
}

interface IWalletContext {
  userDetails?: UserDetails;
  provider?: providers.Web3Provider;
  connect: () => Promise<void>;
}

const INITIAL_WALLET_CONTEXT = {
  userDetails: undefined,
  provider: undefined,
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
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const [provider, setProvider] = useState<
    providers.Web3Provider | undefined
  >();

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

  return (
    <WalletContext.Provider value={{ userDetails, provider, connect }}>
      {children}
    </WalletContext.Provider>
  );
};
