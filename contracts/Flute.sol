//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Flute is Item {
    constructor()
        Item(
            "Flute",
            "FLUTE",
            ["Brass", "Silver", "Gold"],
            ["Flute", "Ocarina", "Panpipes"],
            ["One Pipe", "Two Pipes", "Three Pipes"],
            ["Four Holes", "Five Holes", "Six Holes"],
            ["Piccolo", "Soprano", "Alto"],
            ["Pearl Inlay", "Silver Keys", "Decorative Engraving"]
        )
    {}
}
