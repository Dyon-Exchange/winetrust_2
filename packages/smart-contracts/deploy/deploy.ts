/* eslint-disable no-console */
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployContract: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  // check deploy account mnemonic exists
  if (!process.env.MNEMONIC) throw new Error("Need to set the mnemonic");

  // hardhat runtime environment (hre)
  const { deployments } = hre;

  // Connect to a ether wallet (metamask) with the mnemonic sentence
  const ethersWallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);

  // Connect the wallet with this address
  const wallet = ethersWallet.connect(ethers.provider);

  // Define whats in deployment????
  const { deploy } = deployments;

  // Deploy StableCoinToken
  const WineTrustToken = await deploy("WineTrustToken", {
    from: wallet.address,
    args: [],
  });

  console.log(`Deployed token to: ${WineTrustToken.address}`);
};

export default deployContract;
deployContract.tags = ["All"];
