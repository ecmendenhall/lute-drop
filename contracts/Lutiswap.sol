//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IItem.sol";

import "hardhat/console.sol";

contract Lutiswap is Ownable, ReentrancyGuard {
    IItem public lute;
    IItem public flute;

    constructor(address _lute, address _flute) {
        lute = IItem(_lute);
        flute = IItem(_flute);
    }

    function swapExactFluteForLute(uint256 tokenId) public nonReentrant {
        flute.burn(tokenId);
        lute.craft(msg.sender);
    }

    function fluteSwapPrice(uint256 _l, uint256 _f)
        public
        pure
        returns (uint256)
    {
        uint256 l = _l * 1e17;
        uint256 f = _f * 1e17;
        uint256 k = l * f;
        return (k / (f - 1e17)) - l;
    }
}
