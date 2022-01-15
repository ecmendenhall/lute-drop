//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./lib/ItemLib.sol";

abstract contract Item is ERC721Enumerable, AccessControl {
    bytes32 public constant CRAFTER_ROLE = keccak256("CRAFTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint256 public nextId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
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
        _mint(recipient, id);
    }

    function burn(uint256 tokenId) public onlyRole(BURNER_ROLE) {
        _burn(tokenId);
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
}
