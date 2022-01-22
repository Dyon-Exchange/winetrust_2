/* eslint-disable no-console */
import { ethers } from "hardhat";

import addresses from "./addresses.json";

async function main() {
  const WineTrustToken = await ethers.getContractFactory("WineTrustToken");
  const wtt = await WineTrustToken.attach("0x00F97A0f0FB628fe638a0BD216Ef0EE35a1cA7C5");

  const MINTER_ROLE = await wtt.MINTER_ROLE();

  for (let i = 0; i < addresses.length; i += 1) {
    const address = addresses[i];
    // eslint-disable-next-line no-await-in-loop
    await wtt.grantRole(MINTER_ROLE, address);
    console.log("Assigned minter role for: ", address);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });