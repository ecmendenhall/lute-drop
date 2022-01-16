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
                    "10",
                    "start",
                    '<g transform="rotate(25 6.116 294.42) scale(.5)"><path style="fill:#ff9811" d="M204.8 0h102.4v512H204.8z"/><path style="fill:#bf720d" d="M256 0h51.2v512H256z"/><path style="fill:#50412e" d="M238.933 34.133h34.133v22.756h-34.133zm0 147.911h34.133v34.133h-34.133z"/><circle style="fill:#50412e" cx="256" cy="136.533" r="17.067"/><circle style="fill:#50412e" cx="256" cy="261.689" r="17.067"/><circle style="fill:#50412e" cx="256" cy="318.578" r="17.067"/><circle style="fill:#50412e" cx="256" cy="375.467" r="17.067"/><path style="fill:#786145" d="M204.8 443.733h102.4v34.133H204.8z"/><path style="fill:#50412e" d="M256 443.733h51.2v34.133H256z"/></g>'
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
