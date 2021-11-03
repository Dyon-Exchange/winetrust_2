/* eslint-disable import/prefer-default-export */

// Currently only supporting goerli, networkId of 5
interface SupportedNetwork {
  chainId: number;
  name: string;
}

export const SUPPORTED_NETWORKS: SupportedNetwork[] = [
  { chainId: 5, name: "Goerli" },
];
