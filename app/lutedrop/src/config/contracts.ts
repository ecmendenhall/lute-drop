import { ChainId } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";

const config = {
  [ChainId.Hardhat]: {
    lute: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
      ]),
    },
    flute: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
      ]),
    },
    luteDrop: {
      address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      abi: new Interface([
        "function latestDrop() external view returns (uint256)",
        "function drops(uint256 dropId) external view returns (tuple(uint256 fee, uint256 craftableSupply, uint256 craftedSupply, uint256 craftsPerAddress))",
        "function crafts(address account, uint256 dropid) external view returns (uint256)",
        "function craft(uint8 item, uint256 dropid) external payable",
      ]),
    },
    lutiswap: {
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      abi: new Interface([
        "function nextLute() external view returns (uint256)",
        "function nextFlute() external view returns (uint256)",
        "function latestSwapPrice() external view returns (uint256, uint256)",
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
