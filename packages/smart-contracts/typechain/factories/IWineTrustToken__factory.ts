/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IWineTrustToken,
  IWineTrustTokenInterface,
} from "../IWineTrustToken";

const _abi = [
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenMetadataHash",
        type: "string",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IWineTrustToken__factory {
  static readonly abi = _abi;
  static createInterface(): IWineTrustTokenInterface {
    return new utils.Interface(_abi) as IWineTrustTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IWineTrustToken {
    return new Contract(address, _abi, signerOrProvider) as IWineTrustToken;
  }
}
