//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Flute is Item {
    constructor() Item("Flute", "FLUTE") {}

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
                    "Wood",
                    "Bone",
                    "Bamboo",
                    "Tin",
                    "Clay",
                    "Brass",
                    "Silver",
                    "Gold",
                    "Jade",
                    "Ivory",
                    "Crystal",
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
                    "Flute",
                    "Ocarina",
                    "Panpipes",
                    "Whistle",
                    "Recorder",
                    "Fife",
                    "Ney",
                    "Piccolo",
                    "Dizi",
                    "Bansuri",
                    "Duduk",
                    "Bombard"
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
                    "One Pipe",
                    "Two Pipes",
                    "Three Pipes",
                    "Four Pipes",
                    "Five Pipes",
                    "Six Pipes",
                    "Seven Pipes",
                    "Side Blown",
                    "Cross Blown",
                    "End Blown",
                    "Reed",
                    "Double Reed"
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
                    "One Hole",
                    "Two Holes",
                    "Three Holes",
                    "Four Holes",
                    "Five Holes",
                    "Six Holes",
                    "Seven Holes",
                    "Eight Holes",
                    "Nine Holes",
                    "Ten Holes",
                    "Slide",
                    "Double Slide"
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
                    "Piccolo",
                    "Soprano",
                    "Alto",
                    "Piccolo",
                    "Soprano",
                    "Alto",
                    "Piccolo",
                    "Soprano",
                    "Alto",
                    "Piccolo",
                    "Soprano",
                    "Alto"
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
                    "Wooden Mouthpiece",
                    "Pearl Inlay",
                    "Jade Inlay",
                    "Ivory Inlay",
                    "Silver Keys",
                    "Gold Keys",
                    "Silver Mouthpiece",
                    "Gold Mouthpiece",
                    "Decorative Engraving",
                    "Silver Trim",
                    "Gold Trim",
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
                "Flute",
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
                "Flute",
                getMaterial(tokenId),
                getType(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getRange(tokenId),
                getDecoration(tokenId)
            );
    }
}
