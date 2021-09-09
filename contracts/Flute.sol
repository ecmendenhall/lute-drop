//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Flute is Item {
    constructor()
        Item(
            "Flute",
            "FLUTE",
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
            ],
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
            ],
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
            ],
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
            ],
            ["Piccolo", "Soprano", "Alto"],
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
        )
    {}
}
