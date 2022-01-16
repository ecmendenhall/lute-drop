//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Lute is Item {
    constructor(bool _useSeeds) Item("Lute", "LUTE", _useSeeds) {}

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
                    "Pine",
                    "Pine",
                    "Spruce",
                    "Spruce",
                    "Cedar",
                    "Cedar",
                    "Ash",
                    "Yew",
                    "Cherry",
                    "Maple",
                    "Walnut",
                    "Ebony",
                    "Bone",
                    "Gold",
                    "Iron",
                    "Crystal"
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
                    "Lute",
                    "Lute",
                    "Guitar",
                    "Mandolin",
                    "Mandolin",
                    "Oud",
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
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getMajorModifier(
                seedsByTokenId[tokenId],
                [
                    "One String",
                    "Two Strings",
                    "Three Strings",
                    "Four Strings",
                    "Four Strings",
                    "Five Strings",
                    "Five Strings",
                    "Five Strings",
                    "Six Strings",
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
        view
        override
        requireTokenExists(tokenId)
        returns (string memory)
    {
        return
            ItemLib.getMinorModifier(
                seedsByTokenId[tokenId],
                [
                    "Six Frets",
                    "Seven Frets",
                    "Eight Frets",
                    "Nine Frets",
                    "Ten Frets",
                    "Ten Frets",
                    "Twelve Frets",
                    "Twelve Frets",
                    "Sixteen Frets",
                    "Sixteen Frets",
                    "Eighteen Frets",
                    "Long Neck",
                    "Short Neck",
                    "Oval Body",
                    "Triangular Body",
                    "Square Body"
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
                    "Bass",
                    "Tenor",
                    "Baritone",
                    "Bass",
                    "Tenor"
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
                    "Whimsical Pegs",
                    "Whimsical Pegs",
                    "Hardwood Inlay",
                    "Pearl Inlay",
                    "Jade Inlay",
                    "Ivory Inlay",
                    "Brass Frets",
                    "Silver Frets",
                    "Gold Frets",
                    "Silver Strings",
                    "Gold Strings",
                    "Decorative Carving",
                    "Silver Pegs",
                    "Brass Pegs",
                    "Gold Pegs",
                    "Colorful Ribbon"
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
                    "rgb(30 58 138)",
                    "10",
                    "start",
                    '<image href="https://lutedrop.com/img/lutes.png" x="0" y="120" width="270" />'
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
                "Lute",
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
                "Lute",
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
