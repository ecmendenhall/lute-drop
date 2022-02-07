//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "../Item.sol";

contract GenericItem is Item {
    constructor(bool _useSeeds) Item("Generic Item", "ITEM", _useSeeds) {}

    function getMaterial(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getMaterial(
                tokenId,
                [
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material",
                    "Material"
                ]
            );
    }

    function getType(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getType(
                tokenId,
                [
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type",
                    "Type"
                ]
            );
    }

    function getMajorModifier(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getMajorModifier(
                tokenId,
                [
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier",
                    "Major Modifier"
                ]
            );
    }

    function getMinorModifier(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getMinorModifier(
                tokenId,
                [
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier",
                    "Minor Modifier"
                ]
            );
    }

    function getRange(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getRange(
                tokenId,
                [
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range",
                    "Range"
                ]
            );
    }

    function getDecoration(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getDecoration(
                tokenId,
                [
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration",
                    "Decoration"
                ]
            );
    }

    function getName(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            ItemLib.getName(
                getMaterial(tokenId),
                getRange(tokenId),
                getType(tokenId),
                getOrder(tokenId)
            );
    }

    function tokenSVG(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            ItemLib.tokenSVG(
                getName(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getDecoration(tokenId),
                "rgb(0 0 0)",
                '<image href="https://example.com/fake.png" x="0" y="0" width="100" />'
            );
    }

    function attributesJSON(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            ItemLib.attributesJSON(
                getType(tokenId),
                getRange(tokenId),
                getMaterial(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getDecoration(tokenId),
                getOrder(tokenId)
            );
    }

    function tokenJSON(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            ItemLib.tokenJSON(
                tokenId,
                "Generic Item",
                getMaterial(tokenId),
                getType(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getRange(tokenId),
                getDecoration(tokenId),
                getOrder(tokenId),
                tokenSVG(tokenId)
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
                "Generic Item",
                getMaterial(tokenId),
                getType(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getRange(tokenId),
                getDecoration(tokenId),
                getOrder(tokenId),
                tokenSVG(tokenId)
            );
    }
}
