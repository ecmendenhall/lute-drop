//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "./interfaces/IItem.sol";

contract LuteDrop is Ownable, ReentrancyGuard {
    IItem public immutable lute;
    IItem public immutable flute;
    address public immutable lutiswap;

    mapping(uint256 => Drop) public drops;
    uint256 public latestDrop;

    uint256 private totalCraftableSupply;
    uint256 private constant MAX_CRAFTABLE_SUPPLY = 2500;

    struct Drop {
        uint256 fee;
        uint256 craftableSupply;
        uint256 craftedSupply;
        uint256 craftsPerAddress;
        mapping(address => uint256) crafts;
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

    function craft(ItemType item, uint256 dropId) public payable nonReentrant {
        Drop storage drop = drops[dropId];

        require(drop.craftableSupply > 0, "Invalid drop ID");
        require(
            drop.crafts[msg.sender] < drop.craftsPerAddress,
            "Already crafted max"
        );
        require(
            drop.craftedSupply < drop.craftableSupply,
            "Supply fully crafted"
        );
        require(msg.value >= drop.fee, "Insufficient payment");

        drop.crafts[msg.sender]++;
        drop.craftedSupply++;
        _craftItem(item, msg.sender);
    }

    function crafts(address claimant, uint256 dropId)
        public
        view
        returns (uint256)
    {
        Drop storage drop = drops[dropId];
        require(drop.craftableSupply > 0, "Invalid drop ID");
        return drop.crafts[claimant];
    }

    function addDrop(
        uint256 fee,
        uint256 craftsPerAddress,
        uint256 craftableSupply
    ) public onlyOwner {
        _addDrop(fee, craftsPerAddress, craftableSupply);
    }

    function withdraw(address to, uint256 value) public onlyOwner {
        _safeTransfer(to, value);
    }

    function _addDrop(
        uint256 fee,
        uint256 craftsPerAddress,
        uint256 craftableSupply
    ) internal {
        require(craftableSupply > 0, "Supply must be > 0");
        require(
            totalCraftableSupply + craftableSupply <= MAX_CRAFTABLE_SUPPLY,
            "Exceeds max supply"
        );
        latestDrop++;
        totalCraftableSupply += craftableSupply;
        drops[latestDrop].fee = fee;
        drops[latestDrop].craftsPerAddress = craftsPerAddress;
        drops[latestDrop].craftableSupply = craftableSupply;
    }

    function _craftItem(ItemType item, address recipient) internal {
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
