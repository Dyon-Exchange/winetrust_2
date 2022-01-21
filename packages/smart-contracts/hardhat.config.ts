import "hardhat-deploy";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@float-capital/solidity-coverage";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { config as dotEnvConfig } from "dotenv";
import { removeConsoleLog } from "hardhat-preprocessor";
import { HardhatUserConfig, task } from "hardhat/config";

dotEnvConfig();
const {
  ALCHEMY_API_URL_GOERLI,
  ALCHEMY_API_URL_RINKEBY,
  ALCHEMY_API_URL_POLYGON_MUMBAI,
  ETHERSCAN_API_KEY,
  PRIVATE_KEY,
  REPORT_GAS,
} = process.env;

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const [owner, addr1, addr2, ...addrs] = await hre.ethers.getSigners();
  console.log(`Owner.address ${owner.address}`)
});

task("balance", "Prints an account's balance").setAction(async (args, hre) => {

});

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  gasReporter: {
    enabled: REPORT_GAS === "true",
  },
  paths: {
    sources: "contracts",
  },
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: ALCHEMY_API_URL_RINKEBY || "",
      accounts: [`${PRIVATE_KEY}`],
      chainId: 4,
      saveDeployments: true,
    },
    goerli: {
      url: ALCHEMY_API_URL_GOERLI || "",
      accounts: [`${PRIVATE_KEY}`],
      gas: 21000000,
      gasPrice: 80000000000,
      chainId: 5,
      saveDeployments: true,
    },
    mumbai_testnet: {
      url: ALCHEMY_API_URL_POLYGON_MUMBAI || "",
      accounts: [`${PRIVATE_KEY}`],
      gas: 21000000,
      gasPrice: 80000000000,
      chainId: 80001,
      timeout: 100000,
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (hre) =>
        hre.network.name !== "hardhat" && hre.network.name !== "localhost"
    ),
  },
  
};

module.exports = { 
  config
}
