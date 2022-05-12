import Web3 from "web3";
import { AbiItem } from "web3-utils";

import config from "../config";

import abiJson from "./abis/WineTrustToken.json";

export const web3 = new Web3(config.web3Provider);

const tokenAddress = config.tokenContractAddress;
const tokenContract = new web3.eth.Contract(abiJson as AbiItem[], tokenAddress);

export const token = {
  address: tokenAddress,
  contract: tokenContract,
};
