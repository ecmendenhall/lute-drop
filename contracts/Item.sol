//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./lib/ItemLib.sol";

abstract contract Item is ERC721Enumerable, AccessControl {
    bytes32 public constant CRAFTER_ROLE = keccak256("CRAFTER_ROLE");

    bool internal immutable useSeeds;
    mapping(uint256 => uint256) internal seedsByTokenId;
    uint256 internal nextId;

    constructor(
        string memory name,
        string memory symbol,
        bool _useSeeds
    ) ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        useSeeds = _useSeeds;
    }

    modifier requireTokenExists(uint256 tokenId) {
        require(_exists(tokenId), "Query for nonexistent token");
        _;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function craft(address recipient) public onlyRole(CRAFTER_ROLE) {
        uint256 id = nextId;
        nextId++;
        seedsByTokenId[id] = _getSeed(id);
        _mint(recipient, id);
    }

    function getMaterial(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function getType(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function getMajorModifier(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function getMinorModifier(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function getRange(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function getDecoration(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function getName(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function tokenSVG(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function attributesJSON(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function tokenJSON(uint256 tokenId)
        public
        view
        virtual
        returns (string memory)
    {}

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {}

    function getOrder(uint256 tokenId)
        public
        view
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return ItemLib.getOrder(seedsByTokenId[tokenId]);
    }

    function _getSeed(uint256 tokenId) internal view returns (uint256) {
        return
            useSeeds
                ? ItemLib.random(
                    abi.encodePacked(
                        tokenId,
                        block.number,
                        block.timestamp,
                        block.difficulty,
                        block.gaslimit,
                        block.basefee,
                        blockhash(block.number - 1),
                        msg.sender,
                        tx.gasprice
                    )
                )
                : tokenId;
    }
}
