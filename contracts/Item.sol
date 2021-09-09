//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./lib/ItemLib.sol";

contract Item is ERC721Enumerable, AccessControl, ReentrancyGuard {
    bytes32 public constant CRAFTER_ROLE = keccak256("CRAFTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    uint256 private nextId;

    string[3] private materials;
    string[3] private types;
    string[3] private majorModifiers;
    string[3] private minorModifiers;
    string[3] private ranges;
    string[3] private decorations;

    constructor(
        string memory name,
        string memory symbol,
        string[3] memory _materials,
        string[3] memory _types,
        string[3] memory _majorModifiers,
        string[3] memory _minorModifiers,
        string[3] memory _ranges,
        string[3] memory _decorations
    ) ERC721(name, symbol) {
        materials = _materials;
        types = _types;
        majorModifiers = _majorModifiers;
        minorModifiers = _minorModifiers;
        ranges = _ranges;
        decorations = _decorations;
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

    function craft(address recipient)
        public
        onlyRole(CRAFTER_ROLE)
        nonReentrant
    {
        uint256 id = nextId;
        nextId++;
        _safeMint(recipient, id);
    }

    function burn(uint256 tokenId) public onlyRole(BURNER_ROLE) nonReentrant {
        _burn(tokenId);
    }

    function getMaterial(uint256 tokenId) public view returns (string memory) {
        return ItemLib.getMaterial(tokenId, materials);
    }

    function getType(uint256 tokenId) public view returns (string memory) {
        return ItemLib.getType(tokenId, types);
    }

    function getMajorModifier(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return ItemLib.getMajorModifier(tokenId, majorModifiers);
    }

    function getMinorModifier(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return ItemLib.getMinorModifier(tokenId, minorModifiers);
    }

    function getRange(uint256 tokenId) public view returns (string memory) {
        return ItemLib.getRange(tokenId, ranges);
    }

    function getDecoration(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return ItemLib.getDecoration(tokenId, decorations);
    }

    function getName(uint256 tokenId) public view returns (string memory) {
        return ItemLib.getName(tokenId, materials, ranges, types);
    }

    function tokenSVG(uint256 tokenId) public view returns (string memory) {
        return
            ItemLib.tokenSVG(
                tokenId,
                materials,
                types,
                majorModifiers,
                minorModifiers,
                ranges,
                decorations
            );
    }

    function attributesJSON(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return
            ItemLib.attributesJSON(
                tokenId,
                materials,
                types,
                majorModifiers,
                minorModifiers,
                ranges,
                decorations
            );
    }

    function tokenJSON(uint256 tokenId) public view returns (string memory) {
        return
            ItemLib.tokenJSON(
                tokenId,
                name(),
                materials,
                types,
                majorModifiers,
                minorModifiers,
                ranges,
                decorations
            );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            ItemLib.tokenURI(
                tokenId,
                name(),
                materials,
                types,
                majorModifiers,
                minorModifiers,
                ranges,
                decorations
            );
    }
}
