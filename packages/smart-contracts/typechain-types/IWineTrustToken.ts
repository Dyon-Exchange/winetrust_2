/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IWineTrustTokenInterface extends utils.Interface {
  contractName: "IWineTrustToken";
  functions: {
    "mintNFT(address,string,string,string)": FunctionFragment;
    "productCode(uint256)": FunctionFragment;
    "productId(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "mintNFT",
    values: [string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "productCode",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "productId",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "mintNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "productCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "productId", data: BytesLike): Result;

  events: {};
}

export interface IWineTrustToken extends BaseContract {
  contractName: "IWineTrustToken";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IWineTrustTokenInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    mintNFT(
      account: string,
      tokenMetadataHash: string,
      _productId: string,
      _productCode: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    productCode(id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;

    productId(id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
  };

  mintNFT(
    account: string,
    tokenMetadataHash: string,
    _productId: string,
    _productCode: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  productCode(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  productId(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

  callStatic: {
    mintNFT(
      account: string,
      tokenMetadataHash: string,
      _productId: string,
      _productCode: string,
      overrides?: CallOverrides
    ): Promise<void>;

    productCode(id: BigNumberish, overrides?: CallOverrides): Promise<string>;

    productId(id: BigNumberish, overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    mintNFT(
      account: string,
      tokenMetadataHash: string,
      _productId: string,
      _productCode: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    productCode(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    productId(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    mintNFT(
      account: string,
      tokenMetadataHash: string,
      _productId: string,
      _productCode: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    productCode(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    productId(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
