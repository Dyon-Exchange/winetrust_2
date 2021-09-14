// SPDX-License-Identifier: MIT

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

// Import open zepplin 1155 token standard
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

// The main wine trust token contract which extends the ERC1155 minter pauser preset
contract WineTrustToken is ERC1155PresetMinterPauser {
    constructor() ERC1155PresetMinterPauser("") {}
}
