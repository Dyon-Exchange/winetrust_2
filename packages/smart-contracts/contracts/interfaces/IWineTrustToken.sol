// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/** @title The main wine trust token contract interface */
interface IWineTrustToken {
    /* FUNCTIONS */
    function mintToken(address account, string calldata tokenMetaDataHash)
        external;

    function getTokenMetaData(uint256 id) external view returns (string memory);
}
