const hre = require("hardhat");

const { ethers } = hre;

const addresses = [
  "0x5d504AA5960524Ea82239aCaA5C4715C2096dD77",
  "0x05D6aFc49d88EAB3278165af02EE105E90D714E8",
  // "0x3b70058237176aca3d2a8935f4f9f1875305a102",
];

async function main() {
  const WineTrustToken = await ethers.getContractFactory("WineTrustToken");
  // const wtt = await WineTrustToken.attach(
  //   "0x04d723EC0c9f62d51CBB71AA6Bf4F34732051681"
  // );
  const wtt = await WineTrustToken.attach(
    "0xC5C65c003a2f5e6F88ad40416F0185494e37fb02"
  );

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
