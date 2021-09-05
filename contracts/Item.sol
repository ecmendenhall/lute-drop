//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./lib/Base64.sol";

contract Item is ERC721Enumerable {
    using Strings for uint256;

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
    }

    function getMaterial(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "MATERIAL", materials);
    }

    function getType(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "TYPE", types);
    }

    function getMajorModifier(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return pluck(tokenId, "MAJORMOD", majorModifiers);
    }

    function getMinorModifier(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return pluck(tokenId, "MINORMOD", minorModifiers);
    }

    function getRange(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "RANGE", ranges);
    }

    function getDecoration(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return pluck(tokenId, "DECORATION", decorations);
    }

    function getName(uint256 tokenId) public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    getMaterial(tokenId),
                    " ",
                    getRange(tokenId),
                    " ",
                    getType(tokenId)
                )
            );
    }

    function tokenSVG(uint256 tokenId) public view returns (string memory) {
        string[9] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';
        parts[1] = getName(tokenId);
        parts[2] = '</text><text x="10" y="40" class="base">';
        parts[3] = getMajorModifier(tokenId);
        parts[4] = '</text><text x="10" y="60" class="base">';
        parts[5] = getMinorModifier(tokenId);
        parts[6] = '</text><text x="10" y="80" class="base">';
        parts[7] = getDecoration(tokenId);
        parts[8] = "</text></svg>";

        return
            string(
                abi.encodePacked(
                    parts[0],
                    parts[1],
                    parts[2],
                    parts[3],
                    parts[4],
                    parts[5],
                    parts[6],
                    parts[7],
                    parts[8]
                )
            );
    }

    function attributesJSON(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "[",
                    encodeAttribute("Type", getType(tokenId)),
                    ",",
                    encodeAttribute("Range", getRange(tokenId)),
                    ",",
                    encodeAttribute("Material", getMaterial(tokenId)),
                    ",",
                    encodeAttribute(
                        "Major Modifier",
                        getMajorModifier(tokenId)
                    ),
                    ",",
                    encodeAttribute(
                        "Minor Modifier",
                        getMinorModifier(tokenId)
                    ),
                    ",",
                    encodeAttribute("Decoration", getDecoration(tokenId)),
                    "]"
                )
            );
    }

    function tokenJSON(uint256 tokenId) public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '{"name":"',
                    name(),
                    " #",
                    tokenId.toString(),
                    '","description":"I hear that you and your bard have sold your lutes and bought flutes. I hear that you and your bard have sold your flutes and bought lutes.","image":"data:image/svg+xml;base64,',
                    Base64.encode(bytes(tokenSVG(tokenId))),
                    '","attributes":',
                    attributesJSON(tokenId),
                    "}"
                )
            );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(bytes(tokenJSON(tokenId)))
                )
            );
    }

    function encodeAttribute(string memory attr, string memory value)
        internal
        view
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    '{"trait_type":"',
                    attr,
                    '","value":"',
                    value,
                    '"}'
                )
            );
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[3] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, tokenId.toString()))
        );
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }
}
