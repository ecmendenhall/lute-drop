//SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract MockERC721 is ERC721Enumerable {

    bool useFakeSupply;
    uint256 fakeSupply;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintTo(address recipient, uint256 id) public {
        _safeMint(recipient, id);
    }
}
