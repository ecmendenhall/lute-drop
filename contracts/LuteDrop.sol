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
    IERC721Enumerable public loot;
    IERC721Enumerable public mloot;

    uint256 public lootClaimableSupply;
    uint256 public mlootClaimableSupply;

    Counters.Counter private lootClaimedSupply;
    Counters.Counter private mlootClaimedSupply;

    mapping (uint256 => bool) lootClaims;
    mapping (uint256 => bool) mlootClaims;

    enum ItemType {
        LUTE,
        FLUTE
    }

    enum ClaimType {
        LOOT,
        MLOOT
    }

    constructor(address _lute, address _flute, address _loot, address _mloot, uint256 _lootClaimableSupply, uint256 _mlootClaimableSupply) {
        lute = IItem(_lute);
        flute = IItem(_flute);
        loot = IERC721Enumerable(_loot);
        mloot = IERC721Enumerable(_mloot);
        lootClaimableSupply = _lootClaimableSupply;
        mlootClaimableSupply = _mlootClaimableSupply;
    }

    function claim(ItemType item, ClaimType claimType, uint256 tokenId) public nonReentrant {
        if (claimType == ClaimType.LOOT && loot.balanceOf(msg.sender) > 0) {
            require(!lootClaims[tokenId], "LuteDrop: Item already claimed for this tokenId");
            require(loot.ownerOf(tokenId) == msg.sender, "LuteDrop: Must hold specified token to claim");
            require(lootClaimedSupply.current() < lootClaimableSupply, "LuteDrop: Loot holder supply fully claimed");
            lootClaimedSupply.increment();
            lootClaims[tokenId] = true;
            _claim(item, msg.sender);
        }
        if (claimType == ClaimType.MLOOT && mloot.balanceOf(msg.sender) > 0) {
            require(!mlootClaims[tokenId], "LuteDrop: Item already claimed for this tokenId");
            require(mloot.ownerOf(tokenId) == msg.sender, "LuteDrop: Must hold specified token to claim");
            require(mlootClaimedSupply.current() < mlootClaimableSupply, "LuteDrop: mLoot holder supply fully claimed");
            mlootClaimedSupply.increment();
            mlootClaims[tokenId] = true;
            _claim(item, msg.sender);
        }
    }

    function _claim(ItemType item, address recipient) internal {
        if (item == ItemType.LUTE) {
            lute.craft(recipient);
        }
        if (item == ItemType.FLUTE) {
            flute.craft(recipient);
        }
    }
}
