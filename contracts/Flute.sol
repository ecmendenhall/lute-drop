//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Flute is Item {
    constructor(bool _useSeeds) Item("Lute Drop: Flute", "FLUTE", _useSeeds) {}

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
                "rgb(153 27 27)",
                '<svg x="25" y="10"><path fill="#ff9811" d="M164.4 202.98c-19.89-7.32-45.63-16.06-55.33-16.06-7.82 0-15.2 2.56-20.77 7.2-5.75 4.8-8.91 11.22-8.91 18.08 0 5.81 2.36 11.48 6.64 15.96a30.53 30.53 0 0 0 14.3 8.21l5.38 14.45c1.25 3.92 4.28 6.45 7.75 6.45 3.47 0 6.51-2.53 7.76-6.46l6.18-16.97c11.93-3.4 26.6-8.58 37-12.42 3.9-1.44 6.43-5.05 6.43-9.22s-2.52-7.78-6.43-9.22z"/><path fill="#bf720d" d="M164.4 202.98c-11.83-4.36-25.73-9.21-37.1-12.43v43.54l.1-.25c11.93-3.4 26.6-8.58 37-12.42 3.9-1.43 6.43-5.05 6.43-9.22s-2.52-7.78-6.43-9.22z"/><g fill="#50412e" transform="translate(79.39 176.38) scale(.1786)"><circle cx="86.17" cy="200.61" r="18.46"/><circle cx="196.95" cy="194.45" r="18.46"/><circle cx="258.5" cy="219.07" r="18.46"/><circle cx="307.74" cy="182.15" r="18.46"/><circle cx="369.28" cy="194.45" r="18.46"/><circle cx="135.4" cy="151.37" r="18.46"/><circle cx="135.4" cy="249.85" r="18.46"/></g><path fill="#ea348b" d="M123.74 111.31a10.4 10.4 0 0 1-10.39-10.39V96.3h6.93v4.62a3.47 3.47 0 0 0 6.93 0h6.93a10.4 10.4 0 0 1-10.4 10.4Z"/><path fill="#b02768" d="M127.2 100.92a3.47 3.47 0 0 1-6.92 0V96.3h-3.46v12.36a10.4 10.4 0 0 0 17.32-7.74h-6.93z"/><path fill="#ccf8f3" d="M128.36 97.46V26.69l-3.3-16.98h-16.49l-3.3 16.98v70.77z"/><path fill="#00d7df" d="M125.06 9.71h-8.24v87.75h11.54V26.69z"/><path fill="#50412e" d="M113.35 35.11h6.93v6.93h-6.93z"/><path fill="#f7b239" d="M92.1 123.17h77.81v12.9h-77.8zm51.88 60.42H131v-4.52h-12.97v-4.51h-12.97v-4.52H92.1v-28.72h77.81v51.32h-12.97v-4.52h-12.96z"/><path fill="#4d4d4d" d="M101.8 123.17h3.27v46.87h-3.27zm12.97 0h3.27v51.39h-3.27zm12.97 0H131v55.9h-3.27zm12.96 0h3.27v60.42h-3.27zm12.97 0h3.27v64.95h-3.27zm12.97 0h3.27v69.47h-3.27z" opacity=".26"/><path fill="#3a88d6" d="M87.66 145.58v-11.85h86.7v11.85H92.1z"/><path fill="#4d4d4d" d="M167.86 145.58v-11.85h6.5v11.85h-6.17z" opacity=".25"/><path fill="#f95428" d="m240.12 170.3.32.47-2.6 19.05h-7.78l-2.6-19.05.31-.47a5.98 5.98 0 0 0 2.3.47h7.74a5.88 5.88 0 0 0 2.3-.47z"/><path fill="#f7b239" d="M256.61 27.42h-45.33a6.34 6.34 0 0 0-6.34 6.34v.38c0 3.2 2.37 5.84 5.45 6.27v.06s13.77 10.88 13.77 26.83v100.65a5.92 5.92 0 0 0 3.61 5.45 5.98 5.98 0 0 0 2.3.47h7.74a5.87 5.87 0 0 0 2.3-.47c2.13-.9 3.62-3 3.62-5.45V67.3c0-15.96 13.78-26.83 13.78-26.83l-.01-.06a6.32 6.32 0 0 0 5.44-6.27v-.38c0-3.5-2.83-6.34-6.33-6.34z"/><path fill="#4d4d4d" d="M256.61 27.42h-23.14c3.5 0 6.33 2.84 6.33 6.34v.38c0 3.2-2.36 5.84-5.44 6.27a5.81 5.81 0 0 1-.9.06h6.28s-4.47 10.88-4.47 26.83v100.65a5.93 5.93 0 0 1-5.52 5.9l.33.02h7.73a5.87 5.87 0 0 0 2.3-.47c2.13-.9 3.62-3 3.62-5.45V67.29c0-15.95 13.78-26.82 13.78-26.82l-.01-.06a6.32 6.32 0 0 0 5.44-6.27v-.38c0-3.5-2.83-6.34-6.33-6.34z" opacity=".25"/><path fill="#4d4d4d" d="M234.95 80.81a2.64 2.64 0 0 0-3.33 3.68c1.16 2.2 4.54 1.6 4.93-.83a2.66 2.66 0 0 0-1.6-2.85zm0 67.42a2.72 2.72 0 0 0-1-.2c-2.3.03-3.5 2.86-1.87 4.5 1.57 1.59 4.36.51 4.5-1.7a2.67 2.67 0 0 0-1.63-2.6zm0-16.85a2.64 2.64 0 1 0-.75 5.06 2.66 2.66 0 0 0 2.34-2.17 2.66 2.66 0 0 0-1.59-2.9zm0-16.86c-1-.4-2.17-.17-2.92.62-.8.83-.95 2.12-.38 3.12 1.2 2.11 4.45 1.54 4.89-.84a2.66 2.66 0 0 0-1.59-2.9zm-1.52-17a2.66 2.66 0 0 0-2.13 2.58c0 1.02.61 1.97 1.53 2.4a2.7 2.7 0 0 0 3.03-.58c.76-.8.94-2.04.43-3.02a2.65 2.65 0 0 0-2.86-1.38c-.17.03.17-.04 0 0z"/><path fill="#bc8b4b" d="M276.18 235.21c0 2.4-1.95 4.34-4.5 4.5h-11.07c-2.4 0-4.34-1.95-4.49-4.5V76.27c0-2.4 1.95-4.34 4.5-4.5h11.07c2.4 0 4.34 1.95 4.49 4.5z"/><path fill="#ce9959" d="M256.12 76.27V235.2c0 2.4 1.95 4.34 4.5 4.5h3.88c2.4 0 4.34-1.95 4.5-4.5V76.27c0-2.4-1.95-4.34-4.5-4.5h-3.89a4.6 4.6 0 0 0-4.49 4.5z"/><g fill="#7a5427" transform="rotate(-45 275.42 -133.2) scale(.26458)"><circle cx="112.8" cy="356.8" r="8.8"/><circle cx="153.6" cy="316" r="8.8"/><circle cx="194.4" cy="275.2" r="8.8"/><path d="M244 234.4c0 4.8-4 8.8-8.8 8.8-4.8 0-8.8-4-8.8-8.8 0-4.8 4-8.8 8.8-8.8 4.8-.8 8.8 3.2 8.8 8.8z"/><circle cx="276" cy="192.8" r="8.8"/><circle cx="316.8" cy="152" r="8.8"/><circle cx="358.4" cy="111.2" r="8.8"/><circle cx="399.2" cy="70.4" r="8.8"/></g><path fill="#a8773d" d="M276.18 215.46h-20.06v19.75c0 2.4 1.95 4.34 4.5 4.5h11.07c2.4 0 4.34-1.95 4.49-4.5z"/><path fill="#bc8b4b" d="M256.12 215.46v19.75c0 2.4 1.95 4.34 4.5 4.5h3.88c2.4 0 4.34-1.95 4.5-4.5v-19.75Z"/><path fill="#593a1c" d="M271.09 239.7v-14.06c0-2.4-1.95-4.34-4.5-4.5l-1.04-.14c-2.4 0-4.34 1.94-4.49 4.49v14.06Z"/><path fill="#382210" d="M266.75 221h-1.2c-2.4 0-4.34 1.94-4.49 4.49v14.06h3.3c2.39 0 4.33-1.94 4.48-4.49V221.6c-.6-.3-1.34-.44-2.1-.6z"/><path fill="#4d4d4d" d="M77.02 200.6H61.21v-10.21l7.97-8.35 7.84 8.35z"/><path fill="#f7b239" d="M79.32 27.13v163.26H58.9v-20.5l.42.01c4.82 0 8.73-3.9 8.73-8.73H58.9V27.13Z"/><path fill="#4d4d4d" d="M72.06 190.39h7.26V27.13h-7.26z" opacity=".25"/><path fill="#4d4d4d" d="M64.23 63.61a2.57 2.57 0 0 0 1.16 2.81 2.55 2.55 0 0 0 3.53-3.44c-1.12-1.98-4.14-1.54-4.7.63zm-.07 24.71a2.56 2.56 0 0 0 4.34 2.07c.9-.9.98-2.37.2-3.37-1.37-1.79-4.3-.92-4.54 1.3zm.02-12.28a2.56 2.56 0 0 0 1.37 2.65c.97.48 2.18.3 2.95-.47.87-.87.99-2.28.28-3.28-1.3-1.84-4.27-1.13-4.6 1.1zm1.9-38.63a2.58 2.58 0 0 0-1.93 2.35c-.12 2.28 2.74 3.54 4.35 1.93.84-.84.98-2.18.35-3.17a2.57 2.57 0 0 0-2.77-1.11zm-1.9 62.95a2.58 2.58 0 0 0 1.37 2.68 2.55 2.55 0 0 0 3.34-3.59c-1.2-2.01-4.34-1.38-4.71.91zm-.03-48.4c-.09 2.27 2.75 3.5 4.35 1.9.87-.87.99-2.27.28-3.27-1.36-1.95-4.54-1.02-4.63 1.37zm0 72.97c-.17 2.3 2.72 3.62 4.35 1.99.89-.89.99-2.32.25-3.32-1.37-1.87-4.42-.97-4.6 1.33zm.02-12.36a2.57 2.57 0 0 0 1.55 2.72c.94.4 2.06.17 2.78-.55.84-.83.98-2.17.35-3.16-1.24-1.98-4.34-1.29-4.68.99z"/><path fill="#f99c38" d="M190.7 256h16.04a3.65 3.65 0 0 0 3.65-3.65V90.51a3.65 3.65 0 0 0-3.65-3.65H190.7a3.65 3.65 0 0 0-3.64 3.65v15.4a6.2 6.2 0 0 1 0 12.38v13.22a6.2 6.2 0 1 1 0 12.38v13.22a6.2 6.2 0 1 1 0 12.38v13.22a6.2 6.2 0 1 1 0 12.39v57.25a3.65 3.65 0 0 0 3.64 3.65z"/><path fill="#d17519" d="M212.2 211.02a3.16 3.16 0 0 1-2.24.93h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.17 3.17 3.17 0 0 1-.93 2.25zm0-112.87a3.16 3.16 0 0 1-2.24.93h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.18 3.17 3.17 0 0 1-.93 2.24zm0 122.4a3.16 3.16 0 0 1-2.24.92h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.18 3.17 3.17 0 0 1-.93 2.24zm0 28.25a3.16 3.16 0 0 1-2.24.93h-22.47a3.18 3.18 0 0 1 0-6.35h22.47a3.18 3.18 0 0 1 3.17 3.17 3.17 3.17 0 0 1-.93 2.25z"/><path fill="#f9e17a" d="m200.01 226.65-1.29 1.29-1.29-1.3a3.18 3.18 0 0 0-4.49 4.5l1.3 1.29-1.3 1.29a3.18 3.18 0 0 0 4.5 4.49l1.28-1.3 1.3 1.3a3.18 3.18 0 0 0 4.48-4.5l-1.29-1.28 1.3-1.3a3.18 3.18 0 0 0-4.5-4.48z"/><g transform="rotate(-45 116.22 -96.96) scale(.26458)"><path fill="#8fa6b4" d="m256.74 7.96 32.3 32.3L42.07 287.22l-32.3-32.3z"/><path fill="#5d7486" d="M281 32.22 34.03 279.2l8.04 8.04L289.04 40.26l-32.3-32.3z"/><path fill="#34495e" d="m285.13 44.17-32.3-32.3 9.76-9.76a7.2 7.2 0 0 1 10.18 0l22.12 22.12a7.2 7.2 0 0 1 0 10.18z"/><path fill="#34495e" d="M294.89 24.23 272.77 2.11a7.2 7.2 0 0 0-7.2-1.8l18.32 18.34a7.2 7.2 0 0 1 0 10.18l-7.05 7.05 8.3 8.3 9.75-9.77a7.2 7.2 0 0 0 0-10.18z" opacity=".3"/><path fill="#34495e" d="M32.3 297A32.3 32.3 0 0 1 0 264.7l14.85-14.85 32.3 32.3L32.3 297z"/><path fill="#34495e" d="m39.6 274.6-12.63 12.63A32.24 32.24 0 0 1 1.7 275.04 32.31 32.31 0 0 0 32.3 297l14.85-14.85a53767.39 53767.39 0 0 0-7.55-7.55z" opacity=".3"/><path fill="#34495e" d="m75.42 189.28 14.85-14.85 24.48 24.48-14.85 14.85z"/><path fill="#293c4c" d="m114.75 198.91 7.82 7.82-14.85 14.85-7.81-7.82z"/><circle cx="243.19" cy="53.81" r="10.5" fill="#2b2b2b"/><circle cx="214.4" cy="82.6" r="10.5" fill="#2b2b2b"/><circle cx="185.62" cy="111.38" r="10.5" fill="#2b2b2b"/><circle cx="156.83" cy="140.17" r="10.5" fill="#2b2b2b"/><path fill="#2b2b2b" d="m40.33 249.53 7.14 7.14a5.45 5.45 0 0 0 7.7 0l8.7-8.7a5.45 5.45 0 0 0 0-7.71l-7.13-7.14a5.45 5.45 0 0 0-7.71 0l-8.7 8.7a5.45 5.45 0 0 0 0 7.71z"/></g><path fill="#a36300" d="M39.99 250.88H28.55a2.31 2.31 0 0 1-2.31-2.31v-21.94a2.31 2.31 0 0 1 2.3-2.31H40a2.31 2.31 0 0 1 2.3 2.3v21.95a2.31 2.31 0 0 1-2.3 2.3z"/><path fill="#c57300" d="M44.07 77.1h-19.6a3.17 3.17 0 0 0-3.18 3.17v119.75h13.13c0 7.25-5.88 13.12-13.13 13.12v12.94a3.17 3.17 0 0 0 3.18 3.18h19.6a3.17 3.17 0 0 0 3.17-3.18V80.27a3.17 3.17 0 0 0-3.17-3.18z"/><path fill="#a36300" d="M44.07 77.1h-9.65v152.16h9.65a3.17 3.17 0 0 0 3.17-3.18V80.27a3.17 3.17 0 0 0-3.17-3.18z"/><g fill="#5e3c16" transform="rotate(-45 164.51 155.15) scale(.26458)"><circle cx="428.52" cy="84.31" r="17.51"/><circle cx="375.07" cy="137.75" r="17.51"/><circle cx="321.62" cy="191.2" r="17.51"/><circle cx="268.17" cy="244.65" r="17.51"/><circle cx="214.73" cy="298.11" r="17.51"/></g><path fill="#844d00" d="M42.3 235.28H26.24v-6.02H42.3z"/></svg>'
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
