//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "./interfaces/IItem.sol";

contract LuteDrop is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    IItem public lute;
    IItem public flute;

    mapping(address => uint256) public dropId;
    mapping(uint256 => Drop) public drops;

    Counters.Counter private nextId;

    struct Drop {
        IERC721Enumerable token;
        uint256 claimableSupply;
        Counters.Counter claimedSupply;
        mapping(uint256 => bool) claims;
    }

    enum ItemType {
        LUTE,
        FLUTE
    }

    constructor(
        address _lute,
        address _flute,
        address _loot,
        address _mloot,
        uint256 _lootClaimableSupply,
        uint256 _mlootClaimableSupply
    ) {
        lute = IItem(_lute);
        flute = IItem(_flute);

        nextId.increment();
        _addDrop(_loot, _lootClaimableSupply);
        _addDrop(_mloot, _mlootClaimableSupply);
    }

    function claim(
        ItemType item,
        address token,
        uint256 tokenId
    ) public payable nonReentrant {
        uint256 id = dropId[token];
        require(id != 0, "Invalid token address");

        Drop storage drop = drops[id];

        require(!drop.claims[tokenId], "Item already claimed for this tokenId");
        require(
            drop.token.ownerOf(tokenId) == msg.sender,
            "Must own specified token to claim"
        );
        require(
            drop.claimedSupply.current() < drop.claimableSupply,
            "Token holder supply fully claimed"
        );

        drop.claimedSupply.increment();
        drop.claims[tokenId] = true;
        _claimItem(item, msg.sender);
    }

    function addDrop(address token, uint256 claimableSupply) public onlyOwner {
        _addDrop(token, claimableSupply);
    }

    function withdraw(address to, uint256 value) public onlyOwner {
        _safeTransferETH(to, value);
    }

    function _addDrop(address token, uint256 claimableSupply) internal {
        uint256 id = nextId.current();
        nextId.increment();
        dropId[token] = id;
        drops[id].token = IERC721Enumerable(token);
        drops[id].claimableSupply = claimableSupply;
    }

    function _claimItem(ItemType item, address recipient) internal {
        if (item == ItemType.LUTE) {
            lute.craft(recipient);
        }
        if (item == ItemType.FLUTE) {
            flute.craft(recipient);
        }
    }

    function _safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "Transfer failed");
    }
}
