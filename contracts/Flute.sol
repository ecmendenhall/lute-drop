//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Flute is Item {
    constructor(bool _useSeeds) Item("Flute", "FLUTE", _useSeeds) {}

    function getMaterial(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getMaterial(
                seedsByTokenId[tokenId],
                [
                    "Wood",
                    "Wood",
                    "Bone",
                    "Bamboo",
                    "Tin",
                    "Tin",
                    "Clay",
                    "Clay",
                    "Brass",
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
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getType(
                seedsByTokenId[tokenId],
                [
                    "Flute",
                    "Flute",
                    "Ocarina",
                    "Panpipes",
                    "Panpipes",
                    "Whistle",
                    "Whistle",
                    "Recorder",
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
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getMajorModifier(
                seedsByTokenId[tokenId],
                [
                    "One Pipe",
                    "One Pipe",
                    "Two Pipes",
                    "Two Pipes",
                    "Three Pipes",
                    "Three Pipes",
                    "Four Pipes",
                    "Five Pipes",
                    "Six Pipes",
                    "Seven Pipes",
                    "Side Blown",
                    "Cross Blown",
                    "End Blown",
                    "Reed",
                    "Reed",
                    "Double Reed"
                ]
            );
    }

    function getMinorModifier(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getMinorModifier(
                seedsByTokenId[tokenId],
                [
                    "One Hole",
                    "Two Holes",
                    "Three Holes",
                    "Three Holes",
                    "Four Holes",
                    "Four Holes",
                    "Five Holes",
                    "Five Holes",
                    "Six Holes",
                    "Seven Holes",
                    "Eight Holes",
                    "Nine Holes",
                    "Ten Holes",
                    "Slide",
                    "Slide",
                    "Double Slide"
                ]
            );
    }

    function getRange(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getRange(
                seedsByTokenId[tokenId],
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
                    "Alto",
                    "Piccolo",
                    "Soprano",
                    "Alto",
                    "Piccolo"
                ]
            );
    }

    function getDecoration(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getDecoration(
                seedsByTokenId[tokenId],
                [
                    "Wooden Mouthpiece",
                    "Wooden Mouthpiece",
                    "Pearl Inlay",
                    "Jade Inlay",
                    "Ivory Inlay",
                    "Brass Keys",
                    "Silver Keys",
                    "Gold Keys",
                    "Brass Mouthpiece",
                    "Silver Mouthpiece",
                    "Gold Mouthpiece",
                    "Decorative Engraving",
                    "Silver Trim",
                    "Gold Trim",
                    "Colorful Ribbon",
                    "Colorful Ribbon"
                ]
            );
    }

    function getName(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
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
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.tokenSVG(
                getName(tokenId),
                getMajorModifier(tokenId),
                getMinorModifier(tokenId),
                getDecoration(tokenId),
                [
                    "rgb(153 27 27)",
                    "340",
                    "end",
                    '<image href="https://lutedrop.com/img/flutes.png" x="140" y="110" width="200" />'
                ]
            );
    }

    function attributesJSON(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
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
        requireTokenExists(tokenId)
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
                getDecoration(tokenId),
                getOrder(tokenId),
                tokenSVG(tokenId)
            );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        requireTokenExists(tokenId)
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
                getDecoration(tokenId),
                getOrder(tokenId),
                tokenSVG(tokenId)
            );
    }
}
