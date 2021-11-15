import { ethers } from "ethers";
import { hexZeroPad } from "ethers/lib/utils";

export const DEFAULT_ADMIN_ROLE = hexZeroPad("0x0", 32);

export const MINTER_ROLE = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("MINTER_ROLE")
);
