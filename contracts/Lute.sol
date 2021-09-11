//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Lute is Item {
    constructor() Item("Lute", "LUTE") {}

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
                    "Pine",
                    "Spruce",
                    "Cedar",
                    "Ash",
                    "Yew",
                    "Cherry",
                    "Maple",
                    "Walnut",
                    "Ebony",
                    "Bone",
                    "Gold",
                    "Iron"
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
                    "Lute",
                    "Mandolin",
                    "Oud",
                    "Kwitra",
                    "Theorbo",
                    "Bouzouki",
                    "Kobza",
                    "Dombra",
                    "Qinqin",
                    "Tanbur",
                    "Sitar",
                    "Vihuela"
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
                    "One String",
                    "Two Strings",
                    "Three Strings",
                    "Four Strings",
                    "Five Strings",
                    "Six Strings",
                    "Seven Strings",
                    "Eight Strings",
                    "Nine Strings",
                    "Twelve Strings",
                    "Double-Necked",
                    "Triple-Necked"
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
                    "Four Frets",
                    "Five Frets",
                    "Six Frets",
                    "Seven Frets",
                    "Eight Frets",
                    "Nine Frets",
                    "Ten Frets",
                    "Twelve Frets",
                    "Long Neck",
                    "Short Neck",
                    "Triangular Body",
                    "Square Body"
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
                    "Tenor",
                    "Baritone",
                    "Bass",
                    "Tenor",
                    "Baritone",
                    "Bass",
                    "Tenor",
                    "Baritone",
                    "Bass",
                    "Tenor",
                    "Baritone",
                    "Bass"
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
                    "Whimsical Pegs",
                    "Pearl Inlay",
                    "Jade Inlay",
                    "Ivory Inlay",
                    "Silver Frets",
                    "Gold Frets",
                    "Silver Strings",
                    "Gold Strings",
                    "Decorative Carving",
                    "Silver Pegs",
                    "Gold Pegs",
                    "Colorful Ribbon"
                ]
            );
    }

    function getName(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.getName(
                getMaterial(tokenId),
                getRange(tokenId),
                getType(tokenId)
            );
    }

    function tokenSVG(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.tokenSVG(
                getName(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getDecoration(tokenId)
            );
    }

    function attributesJSON(uint256 tokenId)
        public
        pure
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
                getDecoration(tokenId)
            );
    }

    function tokenJSON(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.tokenJSON(
                tokenId,
                "Lute",
                getMaterial(tokenId),
                getType(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getRange(tokenId),
                getDecoration(tokenId)
            );
    }

    function tokenURI(uint256 tokenId)
        public
        pure
        override
        returns (string memory)
    {
        return
            ItemLib.tokenURI(
                tokenId,
                "Lute",
                getMaterial(tokenId),
                getType(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getRange(tokenId),
                getDecoration(tokenId)
            );
    }
}
