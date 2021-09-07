import { Interface } from "ethers/lib/utils";

const LUTE = "0xc351628EB244ec633d5f21fBD6621e1a683B1181";
const FLUTE = "0xFD471836031dc5108809D173A067e8486B9047A3";
const LUTE_DROP = "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc";
const LUTISWAP = "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f";
const LOOT = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const MLOOT = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";

const config = {
  lute: {
    address: LUTE,
    abi: new Interface([
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
    ]),
  },
  flute: {
    address: FLUTE,
    abi: new Interface([
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
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
