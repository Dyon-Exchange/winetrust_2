// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Import the open zepplin ERC1155 token standard, minter pauser preset
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

// The main wine trust token contract which extends the ERC1155 minter pauser preset
contract WineTrustToken is ERC1155PresetMinterPauser {
    constructor() ERC1155PresetMinterPauser("") {}
}
