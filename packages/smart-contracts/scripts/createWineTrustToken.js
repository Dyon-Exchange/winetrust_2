const hre = require("hardhat");

const { ethers, upgrades } = hre;

async function main() {
  const WineTrustToken = await ethers.getContractFactory("WineTrustToken");

  const wt = await upgrades.deployProxy(WineTrustToken, {
    initializer: "initialize()",
  });

  await wt.deployed();
  console.log("WineTrustToken deployed to:", wt.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
