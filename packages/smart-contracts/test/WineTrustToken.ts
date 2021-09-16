/* eslint-disable no-console */
import { ContractFactory } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { WineTrustToken } from "../typechain/WineTrustToken";

describe("WineTrust token contract", () => {
  let Token: ContractFactory;
  let hardhatToken: WineTrustToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];
  let tokenMetadata: string;

  beforeEach(async () => {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("WineTrustToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Mock a token metadata hash string
    tokenMetadata = "QmPnMreCbzNfrS1HKHkXX5WSn9dgRU5Gh6M7jbCgpjVfKV";

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = (await Token.deploy()) as WineTrustToken;
  });

  describe("Deployment", () => {
    it("Should initiate the token id count to 0", async () => {
      expect(await hardhatToken.tokenIdCount()).to.equal(0);
    });
  });

  describe("Minting", () => {
    it("Mint a new WineTrust token to the owner address", async () => {
      await hardhatToken.mintNFT(owner.address, tokenMetadata);
      expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(1);
    });

    it("Mint a new WineTrust token to addr1", async () => {
      await hardhatToken.mintNFT(addr1.address, tokenMetadata);
      expect(await hardhatToken.balanceOf(addr1.address, 1)).to.equal(1);
    });

    it("Token id count increments after a token has been minted", async () => {
      expect(await hardhatToken.tokenIdCount()).to.equal(0);
      await hardhatToken.mintNFT(owner.address, tokenMetadata);
      expect(await hardhatToken.tokenIdCount()).to.equal(1);
    });

    it("Mint override function should add to the supply of an existing WineTrust token", async () => {
      await hardhatToken.mintNFT(owner.address, tokenMetadata);
      expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(1);
      await hardhatToken.mint(owner.address, 1, 5, []);

      expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(6);
    });

    it("Batch mint override function should add to the supply of existing WineTrust tokens", async () => {
      // mint two tokens to the owner address
      await hardhatToken.mintNFT(owner.address, tokenMetadata);
      await hardhatToken.mintNFT(owner.address, tokenMetadata);

      await hardhatToken.mintBatch(owner.address, [1, 2], [4, 9], []);
      expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(5);
      expect(await hardhatToken.balanceOf(owner.address, 2)).to.equal(10);
    });
  });
});
