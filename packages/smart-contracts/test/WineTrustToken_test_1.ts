/* eslint-disable no-console */
import { ContractFactory } from "@ethersproject/contracts";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { task } from "hardhat/config";

import { WineTrustToken } from "../typechain-types/WineTrustToken";

describe("WineTrust token contract", () => {
    let Token: ContractFactory;
    let hardhatToken: WineTrustToken;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let contractMetadata: string;
    let tokenMetadata: string;
    let accounts;

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

    describe("Random Token ID", () => {
        it("Should have a non zero value", async () => {
            let randValue = await hardhatToken.getRandom();
            console.log(`Random Generated Token ID ${randValue}`);
        })
        
        it("Should Emit AssetMinted Event", async () => {

        })

    })

    describe("Minting", () => {

        it("Mint NFT function should not allow any non deployer addresses mint", async () => {
            await expect(
                hardhatToken.connect(addr1).mintNFT(addr1.address, tokenMetadata)
            ).to.be.revertedWith("Must have minter role to mint");
        });

        it("Mint a new WineTrust token to the owner address", async () => {
            console.log(`Owner Address ${owner.address}`)
            await hardhatToken.mintNFT(owner.address, tokenMetadata);
            //expect(await hardhatToken.balanceOf(owner.address, 1)).to.equal(1);
        });

        it("Mint a new WineTrust token to addr1", async () => {
        await hardhatToken.mintNFT(addr1.address, tokenMetadata);
        expect(await hardhatToken.balanceOf(addr1.address, 1)).to.equal(1);
        });

        

    });

});