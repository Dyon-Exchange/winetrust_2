// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/** @title The main wine trust token contract interface */
interface IWineTrustToken {
    /* FUNCTIONS */
    function mintNFT(address account, string calldata tokenMetadataHash, string calldata _productId, string calldata _productCode)
        external;
    function productId(uint256 id) external view returns (string memory);
    function productCode(uint256 id) external view returns (string memory);
}
