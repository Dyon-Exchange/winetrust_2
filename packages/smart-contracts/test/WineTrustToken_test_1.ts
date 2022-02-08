/* eslint-disable no-console */
import { expect } from "chai";

import { WineTrustToken } from "../typechain-types/WineTrustToken";

describe("WineTrust token contract", () => {
    let Token: ContractFactory;
    let hardhatToken: WineTrustToken;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;
    let addrs: SignerWithAddress[];
    let contractMetadata: string;
    let tokenMetadata: string;
    let accounts;

    

});