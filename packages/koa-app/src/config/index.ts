import dotenv from "dotenv";

dotenv.config();

const config = {
  minFromBlock: parseInt(process.env.MIN_FROM_BLOCK, 10) || 0,
  web3Provider: process.env.WEB3_PROVIDER || "http://localhost:8575",
  tokenContractAddress: process.env.TOKEN_CONTRACT_ADDRESS,
};

export default config;
