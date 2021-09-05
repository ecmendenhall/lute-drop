//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Item is ERC721Enumerable {
    using Strings for uint256;

    string[3] private materials;
    string[3] private types;
    string[3] private modifiers;
    string[3] private registers;

    constructor(
        string memory name,
        string memory symbol,
        string[3] memory _materials,
        string[3] memory _types,
        string[3] memory _modifiers,
        string[3] memory _registers
    ) ERC721(name, symbol) {
        materials = _materials;
        types = _types;
        modifiers = _modifiers;
        registers = _registers;
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

    function pluck(
        uint256 tokenId,
        string memory keyPrefix,
        string[3] memory sourceArray
    ) internal pure returns (string memory) {
        uint256 rand = random(
            string(abi.encodePacked(keyPrefix, tokenId.toString()))
        );
        string memory output = sourceArray[rand % sourceArray.length];
        return output;
    }
}
