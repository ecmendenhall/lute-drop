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
            ["Two-Piped", "Four-Holed", "Five-Holed"],
            ["Piccolo", "Soprano", "Alto"]
        )
    {}
}
