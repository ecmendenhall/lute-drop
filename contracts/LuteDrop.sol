//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "./interfaces/IItem.sol";

contract LuteDrop is Ownable, ReentrancyGuard {
    IItem public lute;
    IItem public flute;
    address public lutiswap;
    mapping(uint256 => Drop) public drops;

    uint256 private nextId;
    uint256 private totalClaimableSupply;
    uint256 private constant MAX_CLAIMABLE_SUPPLY = 2500;

    struct Drop {
        uint256 fee;
        uint256 claimableSupply;
        uint256 claimedSupply;
        uint256 claimsPerAddress;
        mapping(address => uint256) claims;
    }

    enum ItemType {
        LUTE,
        FLUTE
    }

    constructor(
        address _lute,
        address _flute,
        address _lutiswap
    ) {
        lute = IItem(_lute);
        flute = IItem(_flute);
        lutiswap = _lutiswap;
    }

    function claim(ItemType item, uint256 dropId) public payable nonReentrant {
        Drop storage drop = drops[dropId];

        require(drop.claimableSupply > 0, "Invalid drop ID");
        require(
            drop.claims[msg.sender] < drop.claimsPerAddress,
            "Already claimed max"
        );
        require(
            drop.claimedSupply < drop.claimableSupply,
            "Supply fully claimed"
        );
        require(msg.value >= drop.fee, "Insufficient payment");

        drop.claims[msg.sender]++;
        drop.claimedSupply++;
        _claimItem(item, msg.sender);
    }

    function claims(address claimant, uint256 dropId)
        public
        view
        returns (uint256)
    {
        Drop storage drop = drops[dropId];
        require(drop.claimableSupply > 0, "Invalid drop ID");
        return drop.claims[claimant];
    }

    function addDrop(
        uint256 fee,
        uint256 claimsPerAddress,
        uint256 claimableSupply
    ) public onlyOwner {
        _addDrop(fee, claimsPerAddress, claimableSupply);
    }

    function withdraw(address to, uint256 value) public onlyOwner {
        _safeTransfer(to, value);
    }

    function _addDrop(
        uint256 fee,
        uint256 claimsPerAddress,
        uint256 claimableSupply
    ) internal {
        require(claimableSupply > 0, "Supply must be > 0");
        require(
            totalClaimableSupply + claimableSupply <= MAX_CLAIMABLE_SUPPLY,
            "Exceeds max supply"
        );
        nextId++;
        totalClaimableSupply += claimableSupply;
        drops[nextId].fee = fee;
        drops[nextId].claimsPerAddress = claimsPerAddress;
        drops[nextId].claimableSupply = claimableSupply;
    }

    function _claimItem(ItemType item, address recipient) internal {
        if (item == ItemType.LUTE) {
            lute.craft(recipient);
            flute.craft(lutiswap);
        }
        if (item == ItemType.FLUTE) {
            flute.craft(recipient);
            lute.craft(lutiswap);
        }
    }

    function _safeTransfer(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "Transfer failed");
    }
}
