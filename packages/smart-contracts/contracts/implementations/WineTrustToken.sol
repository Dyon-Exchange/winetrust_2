// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import interfaces
import "../interfaces/IWineTrustToken.sol";

// Import the open zepplin ERC1155 token standard, minter pauser preset
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

/** @title The main wine trust token contract which extends the ERC1155 minter pauser preset */
contract WineTrustToken is ERC1155PresetMinterPauser, IWineTrustToken {
    /* GLOBAL VARIABLES */
    /**
     * @notice Mapping of token ids to token metadata hashes
     */
    mapping(uint256 => string) public tokens;

    /**
     * @notice Variable to store the token id count
     */
    uint256 public tokenIdCount;

    /**
     * @notice Variable to store the contract level metadata uri
     */
    string public contractLevelURI;

    /* FUNCTIONS */
    /**
     * @notice Initialises the contract and sets token id count to 0
     */
    constructor() ERC1155PresetMinterPauser("") {
        // Initialise the token id count to 0
        tokenIdCount = 0;

        // Initialise the contract level metadata uri
        contractLevelURI = "ipfs://QmQ3Ko2f7wNGRizYrQoiWpCTPQBRt3b6xYMXim9yXBLUr6";
    }

    /**
     * @notice Function to return the contract level metadata uri as defined in the
     * opensea docs: https://docs.opensea.io/docs/contract-level-metadata
     * @return string hash of the contract's metadata
     */
    function contractURI() external view override returns (string memory) {
        return contractLevelURI;
    }

    /**
     * @notice Mint a wine trust token storing the hash of it's metadata in the tokens mapping
     * @param account address of the owner for the new token
     * @param tokenMetadataHash a string hash of the metadata for the new token
     */
    function mintNFT(address account, string calldata tokenMetadataHash)
        external
        override
    {
        // Check if the msg.sender has minter role
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "Must have minter role to mint"
        );

        // Check token metadata hash is not an empty string
        require(
            bytes(tokenMetadataHash).length > 0,
            "Metadata hash is required"
        );

        // Increment token id count and store this token's metadata hash in the tokens mapping
        tokenIdCount++;
        tokens[tokenIdCount] = tokenMetadataHash;

        // Mint an 1155 token
        _mint(account, tokenIdCount, 1, "");
    }

    /**
     * @notice Override the existing ERC1155 minter pauser preset mint function to make sure that a
     * metadata hash for the token id exists in the tokens mapping (make sure this token id has been
     * minted using mintToken before adding to it's balance)
     * @param to address of the owner for the new token
     * @param id token id for the new token
     * @param amount the amount of tokens with type id to mint
     * @param data ...
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        // Check if a metadata hash exists for this token id
        require(bytes(tokens[id]).length > 0, "Token type does not exist");

        super.mint(to, id, amount, data);
    }

    /**
     * @notice Override the existing ERC1155 minter pauser preset mintBatch function to make sure that a
     * metadata hash for the all the token ids exists in the tokens mapping (make sure these token ids have been
     * minted using mintToken before adding to their balance)
     * @param to address of the owner for the new token/s
     * @param ids array of token ids for the new or existing token/s
     * @param amounts array of amounts to mint tokens from the ids array
     * @param data ...
     */
    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public override {
        // loop through the ids array and check if a metadata hash exists for all the token ids
        for (uint256 i = 0; i < ids.length; i++) {
            require(
                bytes(tokens[ids[i]]).length > 0,
                "Token type does not exist"
            );
        }

        super.mintBatch(to, ids, amounts, data);
    }

    /**
     * @notice Override the existing ERC1155 uri function to return to return a token's metadata
     * hash string from the tokens mapping.
     * @param id token id of the token whose metadata will be returned
     * @return string hash of the token's metadata
     */
    function uri(uint256 id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return tokens[id];
    }
}
