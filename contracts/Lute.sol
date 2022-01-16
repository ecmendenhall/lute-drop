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
                    "340",
                    "end",
                    '<g transform="rotate(-25 269.42 118.884) scale(.5)"><path style="fill:#ff9811" d="M266.238 239.229 256 231.685l-10.238 7.544c-4.515 3.326-110.571 82.512-110.571 172.852 0 27.435 13.076 52.983 36.82 71.937C194.615 502.063 224.442 512 256 512s61.385-9.937 83.989-27.98c23.744-18.953 36.82-44.501 36.82-71.937 0-90.341-106.056-169.527-110.571-172.854z"/><path style="fill:#bf720d" d="M266.238 239.229 256 231.685V512c31.558 0 61.385-9.937 83.989-27.98 23.744-18.953 36.82-44.501 36.82-71.937 0-90.341-106.056-169.527-110.571-172.854z"/><path style="fill:#50412e" d="M284.764 0h-57.528v103.551h11.506v207.101h34.516V103.551h11.506zm-74.786 396.944h92.045v34.517h-92.045z"/><circle style="fill:#50412e" cx="256" cy="350.921" r="17.258"/></g>'
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
