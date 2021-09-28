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
  let contractMetadata: string;
  let tokenMetadata: string;

  beforeEach(async () => {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("WineTrustToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Mock a contract level metadata hash string
    contractMetadata = "ipfs://QmQ3Ko2f7wNGRizYrQoiWpCTPQBRt3b6xYMXim9yXBLUr6";

    // Mock a token metadata hash string
    tokenMetadata = "ipfs://QmS3G61RbRmF2ENq6HtvoeA3QuswmFE1P8SP5pPB3WBMZF";

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    hardhatToken = (await Token.deploy()) as WineTrustToken;
  });

  describe("Deployment", () => {
    it("Should initiate the token id count to 0", async () => {
      expect(await hardhatToken.tokenIdCount()).to.equal(0);
    });

    it("Should initiate the contract level uri to the correct hash", async () => {
      expect(await hardhatToken.contractURI()).to.equal(contractMetadata);
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
      await hardhatToken.mint(owner.address, 1, 4, []);

      expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(5);
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

  describe("Minting error handling", () => {
    it("Mint NFT function should not allow any non deployer addresses mint", async () => {
      await expect(
        hardhatToken.connect(addr1).mintNFT(addr1.address, tokenMetadata)
      ).to.be.revertedWith("Must have minter role to mint");
    });

    it("Mint NFT function should not allow empty string as the token metadata hash", async () => {
      await expect(hardhatToken.mintNFT(owner.address, "")).to.be.revertedWith(
        "Metadata hash is required"
      );
    });

    it("Mint override function should not allow adding to the supply of a token with no associated metadata hash", async () => {
      await expect(
        hardhatToken.mint(owner.address, 1, 5, [])
      ).to.be.revertedWith("Token type does not exist");
    });

    it("Batch mint override function should not allow adding to supply the supply of a token with no associated metadata hash", async () => {
      await expect(
        hardhatToken.mintBatch(owner.address, [1, 2], [5, 10], [])
      ).to.be.revertedWith("Token type does not exist");
    });
  });

  describe("Get token metadata", () => {
    it("Returns metadata hash for an existing token", async () => {
      await hardhatToken.mintNFT(owner.address, tokenMetadata);
      expect(await hardhatToken.uri(1)).to.equal(tokenMetadata);
    });

    it("Returns empty string for a non existent token", async () => {
      expect(await hardhatToken.uri(1)).to.equal("");
    });
  });
});
