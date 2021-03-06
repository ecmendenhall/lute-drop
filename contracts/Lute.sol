//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Lute is Item {
    constructor(bool _useSeeds) Item("Lute Drop: Lute", "LUTE", _useSeeds) {}

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
                "rgb(30 58 138)",
                '<svg x="25" y="10"><path fill="#ff9811" d="m164 132.94-3.42-2.52-3.41 2.52c-1.5 1.1-36.86 27.5-36.86 57.62 0 9.15 4.36 17.67 12.27 23.99 7.54 6.01 17.48 9.32 28 9.32s20.47-3.3 28-9.32c7.92-6.32 12.28-14.84 12.28-23.99 0-30.11-35.36-56.51-36.86-57.62z"/><path fill="#bf720d" d="m164 132.94-3.42-2.52v93.45c10.52 0 20.47-3.3 28-9.32 7.92-6.32 12.28-14.84 12.28-23.99 0-30.11-35.36-56.51-36.86-57.62z"/><g fill="#50412e" transform="translate(75.24 53.19) scale(.33337)"><path d="M227.24 0v103.55h11.5v207.1h34.52v-207.1h11.5V0zm-17.26 396.94h92.04v34.52h-92.04z"/><circle cx="256" cy="350.92" r="17.26"/></g><path fill="#f7b239" d="m109.02 203.97-9.96.06-32.08 54.48 74.68-.39z"/><path fill="#c49270" d="m98.75 144.3 9.95-.05.32 59.72.07 13.32-9.96.05-.07-13.31z"/><path fill="#f7b239" d="m98.8 154.67-3.93-22.6 17.58-.09-3.7 22.64z"/><g fill="#4d4d4d" transform="rotate(-45.3 260.43 83.56) scale(.23813)"><circle cx="176.11" cy="335.89" r="31.98"/><path d="m145.9 410.42-44.31-44.3 12.08-12.09 44.3 44.3z"/></g><path fill="#ff9811" d="M86.4 160.12a15.83 15.83 0 0 1-1.56-9.5 17.24 17.24 0 0 0 .2-2.56c0-8.75-6.61-15.87-14.74-15.87-8.12 0-14.73 7.12-14.73 15.87 0 .86.06 1.72.19 2.56.48 3.22-.07 6.6-1.56 9.5a18.1 18.1 0 0 0 16.1 26.32 18.1 18.1 0 0 0 16.1-26.32z"/><path fill="#bf720d" d="M86.4 160.12a15.83 15.83 0 0 1-1.56-9.5 17.24 17.24 0 0 0 .2-2.56c0-8.7-6.54-15.79-14.6-15.87v54.25a18.1 18.1 0 0 0 15.96-26.32z"/><path fill="#50412e" d="m65.28 97.03-1 22.1h3.14v40.18h6.03v-40.18h2.88l-1-22.1zm-1 69.32h12.05v6.02H64.27z"/><g transform="translate(172.73 147) scale(.19844)"><circle cx="256" cy="149.57" r="57.53" fill="#bf720d"/><path fill="#ff9811" d="M306.9 305.97c-17.23-9.08-29.94-25.59-34.87-45.3l-33.98 1.54a69.84 69.84 0 0 1-34.19 44.42 108.8 108.8 0 0 0-57.1 99.97 108.93 108.93 0 0 0 31.3 72.62A108.8 108.8 0 0 0 256.1 512a108.3 108.3 0 0 0 75.12-30 108.32 108.32 0 0 0 34.1-79.3c0-40.68-22.38-77.75-58.4-96.73z"/><path fill="#bf720d" d="M306.9 305.97c-17.23-9.08-29.94-25.59-34.87-45.3l-16.8.77v250.55l.85.01a108.3 108.3 0 0 0 75.13-30 108.32 108.32 0 0 0 34.1-79.3c0-40.68-22.38-77.75-58.4-96.73z"/><path fill="#50412e" d="M238.74 310.65h34.52V57.53h11.5V0h-57.52v57.53h11.5zm-11.5 63.28h57.52v34.52h-57.53zm11.5 86.3v50.39a108.48 108.48 0 0 0 34.52.02v-50.42z"/></g><g transform="rotate(-45 175.15 157.94) scale(.26458)"><path fill="#cc582f" d="m22.72 498.28-9-9 24.5-24.48 9 9zM9 475.97l-9-9 20.2-20.2 9 9zM45.03 512l-9-9 20.2-20.2 9 9z"/><path fill="#cc582f" d="M247.04 303.81c26.55 51.38 7.76 128.35-33.86 169.97-48.31 48.32-126.65 48.33-174.96.02-48.31-48.32-48.31-126.65 0-174.96 41.64-41.65 118.6-60.42 170-33.85z"/><path fill="#4d4d4d" d="m135.6 443.73-67.32-67.31 9-9 67.31 67.32z"/><path fill="#e0b08c" d="m397.18 84.71 30 1.4.12 28.72a11.43 11.43 0 0 0-2.44 1.95L247.04 303.82l-29.71 31.23-40.35-40.34L208.22 265h.02L395.22 87.14a11.68 11.68 0 0 0 1.95-2.44z"/><path fill="#666" d="m414.38 68.33-37.02-37.02 9-9 37.02 37.02zm66.32 66.32-37-37.02 9-9 37.01 37.02zm-44.3-88.92L399.66 9.01l9-9 36.72 36.73zm66.6 66.62-36.72-36.73 9-9L512 103.35z"/><path fill="#cc582f" d="M414.37 59.32c6.99-5.82 15.44-13.74 22.01-22.58a67.79 67.79 0 0 0 6.85-11.12c1.4-2.9 5.34-3.33 8.85-.88a2500.88 2500.88 0 0 0 16.79 11.57 31.4 31.4 0 0 1 6.84 6.84c3 4.38 7.27 10.62 11.57 16.78 2.44 3.52 2 7.46-.9 8.85a68.41 68.41 0 0 0-11.1 6.84c-8.84 6.57-16.75 15.03-22.58 22.03a186.1 186.1 0 0 0-8.5 10.97 7.54 7.54 0 0 1-4.77 3l-7.88 1.59a13.1 13.1 0 0 0-4.25 1.62L397.18 84.7l-.01-.01a12.9 12.9 0 0 0 1.63-4.23l1.58-7.9a7.55 7.55 0 0 1 3-4.76 184 184 0 0 0 10.99-8.5z"/><circle cx="151.03" cy="360.99" r="18.19" fill="#4d4d4d"/></g><path fill="#c49270" d="M273.49 217.02h-3.74l.02-6.79h3.73z"/><path fill="#666" d="M266.28 151.61H255.3v-3.73h10.98zm-.01-25.53H255.3v-3.73h10.97zm.01 16.77H255.3v-3.74h10.97zm0-6.48H255.3v-3.73h10.98zm-.01-25.91H255.3v-3.74h10.97zm0-13.34H255.3v-3.73h10.97zm0-5.72H255.3v-3.73h10.97z"/><path fill="#f7b239" d="m262.54 158.03 9.92-8.47 8.47 8.47a24.96 24.96 0 0 0 9.36 19.48c4.55 3.65 7.36 8.63 7.36 14.12 0 11.17-11.6 20.23-25.91 20.23s-25.91-9.06-25.92-20.23c0-5.5 2.8-10.47 7.36-14.12a24.96 24.96 0 0 0 9.36-19.48zm18.39-77.6v7.96h-14.91v-7.96z"/><path fill="#c49270" d="M280.93 158.03h-18.39V86.11l18.39.33z"/><path fill="#666" d="M281.98 200.39h-20.5v-3.74h20.5zm0-9.15h-20.5v-3.73h20.5zm0-6.47h-20.5v-3.74h20.5z"/><path fill="#ff9811" d="M197.6 10.06h15.05v9.03H197.6z"/><path fill="#bf720d" d="M205.12 128.97h9.03V138h-9.03zm0-126.44h9.03V77.8h-9.03z"/><path fill="#ff9811" d="M209.64 130.47c-15.77 0-28.6-12.83-28.6-28.6s12.83-28.6 28.6-28.6 28.6 12.83 28.6 28.6-12.83 28.6-28.6 28.6z"/><path fill="#bf720d" d="M209.64 73.27c15.77 0 28.6 12.83 28.6 28.6s-12.83 28.6-28.6 28.6"/><path fill="#fff0b4" d="M209.64 118.43c-9.13 0-16.56-7.43-16.56-16.56s7.43-16.56 16.56-16.56a16.57 16.57 0 0 1 0 33.12z"/><path fill="#ffda44" d="M209.64 85.32a16.56 16.56 0 0 1 0 33.11"/><path fill="#50412e" d="M205.12 97.36h9.03v9.03h-9.03z"/><path fill="#ff9811" d="m123.66 53.07-2.82-4.94-2.82 4.94c-.73 1.27-17.77 31.28-17.77 47.13 0 15.09 18.65 22.26 19.45 22.55l1.14.43 1.14-.43a42.3 42.3 0 0 0 9.48-5.32c6.52-4.89 9.97-10.85 9.97-17.23 0-15.85-17.04-45.86-17.77-47.13z"/><path fill="#bf720d" d="m120.84 123.18 1.14-.43a42.3 42.3 0 0 0 9.48-5.32c6.52-4.89 9.97-10.85 9.97-17.23 0-15.85-17.04-45.86-17.77-47.13l-2.82-4.94"/><g fill="#50412e" transform="translate(72.07 26.5) scale(.1905)"><path d="M290.13 68.27C290.13 49.42 256 0 256 0s-34.13 49.42-34.13 68.27a34.11 34.11 0 0 0 17.06 29.55v254.9h34.14V97.81a34.11 34.11 0 0 0 17.06-29.55z"/><circle cx="227.56" cy="392.53" r="17.07"/><circle cx="284.44" cy="392.53" r="17.07"/><path d="M238.93 432.36h34.14V512h-34.14z"/></g></svg>'
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
