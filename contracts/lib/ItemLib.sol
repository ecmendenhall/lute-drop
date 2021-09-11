//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";

library ItemLib {
    using Strings for uint256;

    function getMaterial(uint256 tokenId, string[12] calldata materials)
        public
        pure
        returns (string memory)
    {
        return pluck(tokenId, "MATERIAL", materials);
    }

    function getType(uint256 tokenId, string[12] calldata types)
        public
        pure
        returns (string memory)
    {
        return pluck(tokenId, "TYPE", types);
    }

    function getMajorModifier(
        uint256 tokenId,
        string[12] calldata majorModifiers
    ) public pure returns (string memory) {
        return pluck(tokenId, "MAJORMOD", majorModifiers);
    }

    function getMinorModifier(
        uint256 tokenId,
        string[12] calldata minorModifiers
    ) public pure returns (string memory) {
        return pluck(tokenId, "MINORMOD", minorModifiers);
    }

    function getRange(uint256 tokenId, string[12] calldata ranges)
        public
        pure
        returns (string memory)
    {
        return pluck(tokenId, "RANGE", ranges);
    }

    function getDecoration(uint256 tokenId, string[12] calldata decorations)
        public
        pure
        returns (string memory)
    {
        return pluck(tokenId, "DECORATION", decorations);
    }

    function getName(
        string memory material,
        string memory range,
        string memory itemType
    ) public pure returns (string memory) {
        return string(abi.encodePacked(material, " ", range, " ", itemType));
    }

    function tokenSVG(
        string memory name,
        string memory majorModifier,
        string memory minorModifier,
        string memory decoration
    ) public pure returns (string memory) {
        string[9] memory parts;
        parts[
            0
        ] = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: white; font-family: serif; font-size: 14px; }</style><rect width="100%" height="100%" fill="black" /><text x="10" y="20" class="base">';
        parts[1] = name;
        parts[2] = '</text><text x="10" y="40" class="base">';
        parts[3] = majorModifier;
        parts[4] = '</text><text x="10" y="60" class="base">';
        parts[5] = minorModifier;
        parts[6] = '</text><text x="10" y="80" class="base">';
        parts[7] = decoration;
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

    function attributesJSON(
        string memory itemType,
        string memory range,
        string memory material,
        string memory majorModifier,
        string memory minorModifier,
        string memory decoration
    ) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "[",
                    encodeAttribute("Type", itemType),
                    ",",
                    encodeAttribute("Range", range),
                    ",",
                    encodeAttribute("Material", material),
                    ",",
                    encodeAttribute("Major Modifier", majorModifier),
                    ",",
                    encodeAttribute("Minor Modifier", minorModifier),
                    ",",
                    encodeAttribute("Decoration", decoration),
                    "]"
                )
            );
    }

    function tokenJSON(
        uint256 tokenId,
        string memory name,
        string memory material,
        string memory itemType,
        string memory majorModifier,
        string memory minorModifier,
        string memory range,
        string memory decoration
    ) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    " #",
                    tokenId.toString(),
                    '","description":"I hear that you and your bard have sold your lutes and bought flutes.","image":"data:image/svg+xml;base64,',
                    Base64.encode(
                        bytes(
                            tokenSVG(
                                getName(material, range, itemType),
                                majorModifier,
                                minorModifier,
                                decoration
                            )
                        )
                    ),
                    '","attributes":',
                    attributesJSON(
                        itemType,
                        range,
                        material,
                        majorModifier,
                        minorModifier,
                        decoration
                    ),
                    "}"
                )
            );
    }

    function tokenURI(
        uint256 tokenId,
        string memory name,
        string memory material,
        string memory itemType,
        string memory majorModifier,
        string memory minorModifier,
        string memory range,
        string memory decoration
    ) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            tokenJSON(
                                tokenId,
                                name,
                                material,
                                itemType,
                                majorModifier,
                                minorModifier,
                                range,
                                decoration
                            )
                        )
                    )
                )
            );
    }

    function encodeAttribute(string memory attr, string memory value)
        internal
        pure
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
        string[12] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, tokenId.toString()))
        );
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }
}
