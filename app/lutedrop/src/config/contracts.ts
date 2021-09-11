import { Interface } from "ethers/lib/utils";

const LUTE = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const FLUTE = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const LUTE_DROP = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const LUTISWAP = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";
const LOOT = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const MLOOT = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";

const config = {
  lute: {
    address: LUTE,
    abi: new Interface([
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
      "function totalSupply() returns (uint256)",
    ]),
  },
  flute: {
    address: FLUTE,
    abi: new Interface([
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
      "function totalSupply() returns (uint256)",
    ]),
  },
  luteDrop: {
    address: LUTE_DROP,
    abi: new Interface([
      "function claim(uint8 item, uint8 claimType, uint256 tokenId)",
    ]),
  },
  lutiswap: {
    address: LUTISWAP,
    abi: new Interface([
      "function latestLuteSwapPrice() view returns (uint256)",
      "function latestFluteSwapPrice() view returns (uint256)",
      "function swapExactLuteForFlute(uint256 tokenId) payable",
      "function swapExactFluteForLute(uint256 tokenId) payable",
    ]),
  },
  loot: {
    address: LOOT,
  },
  mloot: {
    address: MLOOT,
  },
};

export default config;
