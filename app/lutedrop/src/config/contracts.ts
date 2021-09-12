import { ChainId } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";

const config = {
  [ChainId.Hardhat]: {
    lute: {
      address: "0xFD471836031dc5108809D173A067e8486B9047A3",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
        "function totalSupply() returns (uint256)",
        "function nextId() returns(uint256)",
      ]),
    },
    flute: {
      address: "0xcbEAF3BDe82155F56486Fb5a1072cb8baAf547cc",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
        "function totalSupply() returns (uint256)",
        "function nextId() returns(uint256)",
      ]),
    },
    luteDrop: {
      address: "0x1429859428C0aBc9C2C47C8Ee9FBaf82cFA0F20f",
      abi: new Interface([
        "function claim(uint8 item, address token, uint256 tokenId) payable",
        "function dropId(address token) returns (uint256)",
        "function drops(uint256 dropId) returns (address, uint256, uint256)",
        "function isClaimed(address token, uint256 tokenId) returns (bool)",
      ]),
    },
    lutiswap: {
      address: "0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07",
      abi: new Interface([
        "function latestSwapPrice() view returns (uint256, uint256)",
        "function swapExactLuteForFlute(uint256 tokenId) payable",
        "function swapExactFluteForLute(uint256 tokenId) payable",
      ]),
    },
    loot: {
      address: "0xFF9C1b15B16263C61d017ee9F65C50e4AE0113D7",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
      ]),
    },
    mloot: {
      address: "0x1dfe7ca09e99d10835bf73044a23b73fc20623df",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
      ]),
    },
  },
  [ChainId.Rinkeby]: {
    lute: {
      address: "0x662A31660f430eB5F93d28Af484045a196653e6d",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
        "function totalSupply() returns (uint256)",
        "function nextId() returns(uint256)",
      ]),
    },
    flute: {
      address: "0x6f3218395776A27696eAae0E6244a77C2a770761",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
        "function totalSupply() returns (uint256)",
        "function nextId() returns(uint256)",
      ]),
    },
    luteDrop: {
      address: "0x71DCbA7E75E974704868CDB657a43444C41c0405",
      abi: new Interface([
        "function claim(uint8 item, address token, uint256 tokenId) payable",
        "function dropId(address token) returns (uint256)",
        "function drops(uint256 dropId) returns (address, uint256, uint256)",
        "function isClaimed(address token, uint256 tokenId) returns (bool)",
      ]),
    },
    lutiswap: {
      address: "0x1bf657Cde28bfc08BE56B86F732bDFEf3358AB6e",
      abi: new Interface([
        "function latestSwapPrice() view returns (uint256, uint256)",
        "function swapExactLuteForFlute(uint256 tokenId) payable",
        "function swapExactFluteForLute(uint256 tokenId) payable",
      ]),
    },
    loot: {
      address: "0x56689336863f1917f301830b377B583dB39d6C4D",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
      ]),
    },
    mloot: {
      address: "0x64e5BBb7242eE28183D27B3936F8A419712eb272",
      abi: new Interface([
        "function balanceOf(address owner) returns (uint256)",
        "function tokenOfOwnerByIndex(address owner, uint256 index) returns (uint256)",
        "function tokenURI(uint256 tokenId) returns (string)",
      ]),
    },
  },
};

export const getConfig = (chainId: ChainId | undefined) => {
  switch (chainId) {
    case ChainId.Hardhat:
      return config[ChainId.Hardhat];
    case ChainId.Rinkeby:
      return config[ChainId.Rinkeby];
    default:
      return config[ChainId.Hardhat];
  }
};

export default config;
