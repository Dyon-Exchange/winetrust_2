// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/** @title The main wine trust token contract interface */
interface IWineTrustToken {
    /* FUNCTIONS */
    function mintNFT(address account, string calldata tokenMetadataHash)
        external;
}
