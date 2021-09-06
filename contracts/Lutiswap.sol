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

    function swapExactFluteForLute(uint256 tokenId)
        public
        payable
        nonReentrant
    {
        return swap(tokenId, flute, lute);
    }

    function latestFluteSwapPrice() public view returns (uint256) {
        return fluteSwapPrice(lute.totalSupply(), flute.totalSupply());
    }

    function fluteSwapPrice(uint256 _l, uint256 _f)
        public
        pure
        returns (uint256)
    {
        return swapPrice(_f, _l);
    }

    function swap(
        uint256 tokenId,
        IItem from,
        IItem to
    ) internal {
        require(from.ownerOf(tokenId) == msg.sender, "Must own item to swap");
        uint256 fromSupply = from.totalSupply();
        uint256 toSupply = to.totalSupply();
        uint256 fee = swapPrice(fromSupply, toSupply);
        require(msg.value >= fee, "Insufficient payment");
        from.burn(tokenId);
        to.craft(msg.sender);
        require(
            (fromSupply + toSupply) == (from.totalSupply() + to.totalSupply()),
            "Supply invariant"
        );
        if (msg.value > fee) {
            safeTransferETH(msg.sender, msg.value - fee);
        }
    }

    function swapPrice(uint256 _from, uint256 _to)
        internal
        pure
        returns (uint256)
    {
        require(_from > 1, "Invalid swap");
        uint256 f = _from * 1e17;
        uint256 t = _to * 1e17;
        uint256 k = f * t;
        return (k / (f - 1e17)) - t;
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "Transfer failed");
    }
}
