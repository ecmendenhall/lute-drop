//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Lute is ERC721Enumerable {
    using Strings for uint256;

    string[] private materials = [
        "Pine",
        "Walnut",
        "Ebony"
    ];

    string[] private types = [
        "Lute",
        "Mandolin",
        "Oud"
    ];

    string[] private modifiers = [
        "Two-Stringed",
        "Three-Stringed",
        "Four-Stringed"
    ];

    string[] private registers = [
        "Tenor",
        "Baritone",
        "Bass"
    ];

    constructor() ERC721("Lute", "LUTE") {
    }

    function getMaterial(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "MATERIAL", materials);
    }

    function getType(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "TYPE", types);
    }

    function getModifier(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "MODIFIER", modifiers);
    }

    function getRegister(uint256 tokenId) public view returns (string memory) {
        return pluck(tokenId, "REGISTER", registers);
    }


    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function pluck(uint256 tokenId, string memory keyPrefix, string[] memory sourceArray) internal pure returns (string memory) {
        uint256 rand = random(string(abi.encodePacked(keyPrefix, tokenId.toString())));
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }


}
