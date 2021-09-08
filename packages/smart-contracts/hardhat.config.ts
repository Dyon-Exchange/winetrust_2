import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@float-capital/solidity-coverage";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import { config as dotEnvConfig } from "dotenv";
import { removeConsoleLog } from "hardhat-preprocessor";
import { HardhatUserConfig } from "hardhat/config";

dotEnvConfig();
const { INFURA_API_KEY } = process.env;
const { MNEMONIC } = process.env;
const { REPORT_GAS } = process.env;

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
    // hardhat: {
    //     accounts: { mnemonic: MNEMONIC || "" },
    // },
    // hardhat: {
    //   forking: {
    //     url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
    //     blockNumber: ETH_FORK_BLOCK_NUMBER,
    //   },
    // },
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY || ""}`,
      accounts: { mnemonic: MNEMONIC || "" },
      gas: 21000000,
      gasPrice: 80000000000,
      saveDeployments: true,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY || ""}`,
      accounts: { mnemonic: MNEMONIC || "" },
      gas: 8500000,
      gasPrice: 5e9,
      chainId: 1,
      timeout: 500,
    },
    coverage: {
      url: "http://127.0.0.1:8555", // Coverage launches its own ganache-cli client
    },
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (hre) =>
        hre.network.name !== "hardhat" && hre.network.name !== "localhost"
    ),
  },
};

export default config;
