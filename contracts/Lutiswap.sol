//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IItem.sol";

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

    function swapExactLuteForFlute(uint256 tokenId)
        public
        payable
        nonReentrant
    {
        return swap(tokenId, lute, flute);
    }

    function latestSwapPrice() public view returns (uint256, uint256) {
        return swapPrice(lute.totalSupply(), flute.totalSupply());
    }

    function swapPrice(uint256 l, uint256 f)
        public
        pure
        returns (uint256, uint256)
    {
        return (_swapPrice(l, f), _swapPrice(f, l));
    }

    function swap(
        uint256 tokenId,
        IItem from,
        IItem to
    ) internal {
        require(from.ownerOf(tokenId) == msg.sender, "Must own item to swap");
        uint256 fromSupply = from.totalSupply();
        uint256 toSupply = to.totalSupply();
        uint256 fee = _swapPrice(fromSupply, toSupply);
        require(msg.value >= fee, "Insufficient payment");
        from.burn(tokenId);
        to.craft(msg.sender);
        require(
            (fromSupply + toSupply) == (from.totalSupply() + to.totalSupply()),
            "Supply invariant"
        );
        if (msg.value > fee) {
            _safeTransferETH(msg.sender, msg.value - fee);
        }
    }

    function withdraw(address to, uint256 value) public onlyOwner {
        _safeTransferETH(to, value);
    }

    function _swapPrice(uint256 _from, uint256 _to)
        internal
        pure
        returns (uint256)
    {
        require(_from > 1, "Invalid swap");
        uint256 f = _from * 1e18;
        uint256 t = _to * 1e18;
        uint256 k = f * t;
        return ((k / (f - 1e18)) - t) / 1e2;
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "Transfer failed");
    }
}
