import { Interface } from "ethers/lib/utils";

const LUTE_HARDHAT = "0xFD471836031dc5108809D173A067e8486B9047A3";
const FLUTE_HARDHAT = "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc";
const LUTE_DROP_HARDHAT = "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f";
const LUTISWAP_HARDHAT = "0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07";
const LOOT_HARDHAT = "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7";
const MLOOT_HARDHAT = "0x1dfe7ca09e99d10835bf73044a23b73fc20623df";

const LUTE_RINKEBY = "0xE58CeDE7C5413D8096564ed53c2Ea803a6f15139";
const FLUTE_RINKEBY = "0x0c5AF98785d52858DA21EE62E144dE39A49cB14D";
const LUTE_DROP_RINKEBY = "0x6644b74Ab53e816FE71b79462E355Cd44c357FeD";
const LUTISWAP_RINKEBY = "0xE2757d6197B55239cf1D229Bb766fC85f8Bbf29f";
const LOOT_RINKEBY = "0x56689336863f1917f301830b377B583dB39d6C4D";
const MLOOT_RINKEBY = "0x64e5BBb7242eE28183D27B3936F8A419712eb272";

const LUTE = LUTE_HARDHAT;
const FLUTE = FLUTE_HARDHAT;
const LUTE_DROP = LUTE_DROP_HARDHAT;
const LUTISWAP = LUTISWAP_HARDHAT;
const LOOT = LOOT_HARDHAT;
const MLOOT = MLOOT_HARDHAT;

const config = {
  lute: {
    address: LUTE,
    abi: new Interface([
      "function balanceOf(address owner) returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
      "function totalSupply() returns (uint256)",
      "function nextId() returns(uint256)",
    ]),
  },
  flute: {
    address: FLUTE,
    abi: new Interface([
      "function balanceOf(address owner) returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
      "function totalSupply() returns (uint256)",
      "function nextId() returns(uint256)",
    ]),
  },
  luteDrop: {
    address: LUTE_DROP,
    abi: new Interface([
      "function claim(uint8 item, address token, uint256 tokenId) payable",
      "function dropId(address token) returns (uint256)",
      "function drops(uint256 dropId) returns (address, uint256, uint256)",
      "function isClaimed(address token, uint256 tokenId) returns (bool)",
    ]),
  },
  lutiswap: {
    address: LUTISWAP,
    abi: new Interface([
      "function latestSwapPrice() view returns (uint256, uint256)",
      "function swapExactLuteForFlute(uint256 tokenId) payable",
      "function swapExactFluteForLute(uint256 tokenId) payable",
    ]),
  },
  loot: {
    address: LOOT,
    abi: new Interface([
      "function balanceOf(address owner) returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
    ]),
  },
  mloot: {
    address: MLOOT,
    abi: new Interface([
      "function balanceOf(address owner) returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
      "function tokenURI(uint256 tokenId) returns (string)",
    ]),
  },
};

export default config;
