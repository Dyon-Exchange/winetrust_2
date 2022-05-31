/* eslint-disable no-console */
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployContract: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  // hardhat runtime environment (hre)
  const { deployments, getNamedAccounts } = hre;

  // Define whats in deployment????
  const { deploy, } = deployments;

  const { deployer } = await getNamedAccounts();

  // Deploy StableCoinToken
  const WineTrustToken = await deploy("WineTrustToken", {
    from: deployer,
    args: [],
    proxy: {
      methodName: "initialize",
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
    },
  });


  console.log(`Deployed token to: ${WineTrustToken.address}`);
};

export default deployContract;
deployContract.tags = ["All"];
