//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IItem.sol";

contract Lutiswap is Ownable, ReentrancyGuard {
    IItem public lute;
    IItem public flute;

    uint256 luteSwapPrice;
    uint256 fluteSwapPrice;
    constructor(address _lute, address _flute) {
        lute = IItem(_lute);
        flute = IItem(_flute);
    }

    function swapExactFluteForLute(uint256 tokenId) public nonReentrant {
        flute.burn(tokenId);
        lute.craft(msg.sender);
    }
}
