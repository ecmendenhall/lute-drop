//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IItem.sol";

contract Lutiswap is Ownable, ReentrancyGuard {
    IItem public lute;
    IItem public flute;

    uint256 public baseFee = 1 ether;

    event Swap(
        address indexed user,
        address indexed from,
        address indexed to,
        uint256 fromTokenId,
        uint256 toTokenId,
        uint256 fee
    );
    event UpdateBaseFee(uint256 oldFee, uint256 newFee);
    event Withdraw(address indexed to, uint256 amount);

    constructor(address _lute, address _flute) {
        lute = IItem(_lute);
        flute = IItem(_flute);
    }

    function nextLute() external view returns (uint256) {
        return _nextToken(lute);
    }

    function nextFlute() external view returns (uint256) {
        return _nextToken(flute);
    }

    function latestSwapLuteForFlutePrice() external view returns (uint256) {
        return
            swapLuteForFlutePrice(
                lute.balanceOf(address(this)),
                flute.balanceOf(address(this))
            );
    }

    function latestSwapFluteForLutePrice() external view returns (uint256) {
        return
            swapFluteForLutePrice(
                lute.balanceOf(address(this)),
                flute.balanceOf(address(this))
            );
    }

    function swapLuteForFlutePrice(uint256 l, uint256 f)
        public
        view
        returns (uint256)
    {
        return _swapPrice(l, f);
    }

    function swapFluteForLutePrice(uint256 l, uint256 f)
        public
        view
        returns (uint256)
    {
        return _swapPrice(f, l);
    }

    function swapExactFluteForLute(uint256 tokenId)
        external
        payable
        nonReentrant
    {
        return _swap(tokenId, flute, lute);
    }

    function swapExactLuteForFlute(uint256 tokenId)
        external
        payable
        nonReentrant
    {
        return _swap(tokenId, lute, flute);
    }

    function _nextToken(IItem token) internal view returns (uint256) {
        return token.tokenOfOwnerByIndex(address(this), 0);
    }

    function _swap(
        uint256 tokenId,
        IItem from,
        IItem to
    ) internal {
        require(from.ownerOf(tokenId) == msg.sender, "Must own item to swap");
        uint256 fromReserve = from.balanceOf(address(this));
        uint256 toReserve = to.balanceOf(address(this));
        uint256 fee = _swapPrice(fromReserve, toReserve);
        require(msg.value >= fee, "Insufficient payment");
        from.transferFrom(msg.sender, address(this), tokenId);
        uint256 outTokenId = _nextToken(to);
        to.transferFrom(address(this), msg.sender, outTokenId);
        require(
            (fromReserve + toReserve) ==
                (from.balanceOf(address(this)) + to.balanceOf(address(this))),
            "Supply invariant"
        );
        if (msg.value > fee) {
            _safeTransferETH(msg.sender, msg.value - fee);
        }
        emit Swap(
            msg.sender,
            address(from),
            address(to),
            tokenId,
            outTokenId,
            fee
        );
    }

    function setBaseFee(uint256 newBaseFee) public onlyOwner {
        emit UpdateBaseFee(baseFee, newBaseFee);
        baseFee = newBaseFee;
    }

    function withdraw(address to, uint256 value) public onlyOwner {
        _safeTransferETH(to, value);
        emit Withdraw(to, value);
    }

    function _swapPrice(uint256 _from, uint256 _to)
        internal
        view
        returns (uint256)
    {
        require(_from > 1 && _to > 1, "Invalid swap");
        uint256 f = _from * 1e18;
        uint256 t = _to * 1e18;
        uint256 k = f * t;
        return (((k / (t - 1e18)) - f) * baseFee) / 1e18;
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "Transfer failed");
    }
}
