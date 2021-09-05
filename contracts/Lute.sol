//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./Item.sol";

contract Lute is Item {
    constructor()
        Item(
            "Lute",
            "LUTE",
            ["Pine", "Walnut", "Ebony"],
            ["Lute", "Mandolin", "Oud"],
            ["Two Strings", "Three Strings", "Four Strings"],
            ["Five Frets", "Six Frets", "Seven Frets"],
            ["Tenor", "Baritone", "Bass"]
        )
    {}
}
