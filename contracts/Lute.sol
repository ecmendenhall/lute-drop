//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Lute is Item {
    constructor()
        Item(
            "Lute",
            "LUTE",
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
            ],
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
            ],
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
            ],
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
            ],
            ["Tenor", "Baritone", "Bass"],
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
        )
    {}
}
