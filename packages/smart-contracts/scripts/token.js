const hre = require("hardhat")
const ethers = hre.ethers;

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');
  
    // We get the contract to deploy
    const WineTrustToken = await hre.ethers.getContractFactory("WineTrustToken");
    const token = await WineTrustToken.deploy();
  
    await token.deployed();
  
    console.log("WineTrust deployed to:", token.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });