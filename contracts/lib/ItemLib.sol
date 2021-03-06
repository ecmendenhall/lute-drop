//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";

library ItemLib {
    using Strings for uint256;

    function getMaterial(uint256 seed, string[16] calldata materials)
        public
        pure
        returns (string memory)
    {
        return pluck(seed, "MATERIAL", materials);
    }

    function getType(uint256 seed, string[16] calldata types)
        public
        pure
        returns (string memory)
    {
        return pluck(seed, "TYPE", types);
    }

    function getMajorModifier(uint256 seed, string[16] calldata majorModifiers)
        public
        pure
        returns (string memory)
    {
        return pluck(seed, "MAJORMOD", majorModifiers);
    }

    function getMinorModifier(uint256 seed, string[16] calldata minorModifiers)
        public
        pure
        returns (string memory)
    {
        return pluck(seed, "MINORMOD", minorModifiers);
    }

    function getRange(uint256 seed, string[16] calldata ranges)
        public
        pure
        returns (string memory)
    {
        return pluck(seed, "RANGE", ranges);
    }

    function getDecoration(uint256 seed, string[16] calldata decorations)
        public
        pure
        returns (string memory)
    {
        return pluck(seed, "DECORATION", decorations);
    }

    function getOrder(uint256 seed) public pure returns (string memory) {
        return
            pluck(
                seed,
                "ORDER",
                [
                    "Power",
                    "Giants",
                    "Titans",
                    "Skill",
                    "Perfection",
                    "Brilliance",
                    "Enlightenment",
                    "Protection",
                    "Anger",
                    "Rage",
                    "Fury",
                    "Vitriol",
                    "the Fox",
                    "Detection",
                    "Reflection",
                    "the Twins"
                ]
            );
    }

    function getName(
        string memory material,
        string memory range,
        string memory itemType,
        string memory order
    ) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    material,
                    " ",
                    range,
                    " ",
                    itemType,
                    " of ",
                    order
                )
            );
    }

    function _textElement(string memory y, string memory text)
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    '<text x="170" y="',
                    y,
                    '" class="base" text-anchor="middle">',
                    text,
                    "</text>"
                )
            );
    }

    function _styleTags(string memory color)
        internal
        pure
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "<style>.base { fill: ",
                    color,
                    '; font-family: Luminari, serif; font-size: 16px; }</style><rect width="100%" height="100%" fill="rgb(253 240 221)" />'
                )
            );
    }

    function tokenSVG(
        string memory name,
        string memory majorModifier,
        string memory minorModifier,
        string memory decoration,
        string memory color,
        string memory svg
    ) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 400">',
                    _styleTags(color),
                    svg,
                    _textElement("300", name),
                    _textElement("325", majorModifier),
                    _textElement("350", minorModifier),
                    _textElement("375", decoration),
                    "</svg>"
                )
            );
    }

    function attributesJSON(
        string memory itemType,
        string memory range,
        string memory material,
        string memory majorModifier,
        string memory minorModifier,
        string memory decoration,
        string memory order
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
                    ",",
                    encodeAttribute("Order", order),
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
        string memory decoration,
        string memory order,
        string memory svg
    ) public pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '{"name":"',
                    name,
                    " #",
                    tokenId.toString(),
                    '","description":"I hear that you and your bard have sold your lutes and bought flutes.","image":"data:image/svg+xml;base64,',
                    Base64.encode(bytes(svg)),
                    '","attributes":',
                    attributesJSON(
                        itemType,
                        range,
                        material,
                        majorModifier,
                        minorModifier,
                        decoration,
                        order
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
        string memory decoration,
        string memory order,
        string memory svg
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
                                decoration,
                                order,
                                svg
                            )
                        )
                    )
                )
            );
    }

    function random(bytes memory seed) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(seed)));
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

    function pluck(
        uint256 seed,
        string memory keyPrefix,
        string[16] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(abi.encodePacked(keyPrefix, seed.toString()));
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }
}
