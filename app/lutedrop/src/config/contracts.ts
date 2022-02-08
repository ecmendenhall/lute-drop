import { ChainId } from "@usedapp/core";
import { Interface } from "ethers/lib/utils";

const config = {
  [ChainId.Hardhat]: {
    lute: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
        "function setApprovalForAll(address operator, bool approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    flute: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
        "function setApprovalForAll(address operator, bool approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    luteDrop: {
      address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      abi: new Interface([
        "function latestDrop() external view returns (uint256)",
        "function drops(uint256 dropId) external view returns (tuple(uint256 fee, uint256 craftableSupply, uint256 craftedSupply, uint256 craftsPerAddress))",
        "function crafts(address account, uint256 dropid) external view returns (uint256)",
        "function craft(uint8 item, uint256 dropid) external payable",
        "event Craft(address indexed to, uint8 indexed item, uint256 fee)",
      ]),
    },
    lutiswap: {
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      abi: new Interface([
        "function nextLute() external view returns (uint256)",
        "function nextFlute() external view returns (uint256)",
        "function latestSwapLuteForFlutePrice() external view returns (uint256)",
        "function latestSwapFluteForLutePrice() external view returns (uint256)",
        "function swapExactLuteForFlute(uint256 tokenId) external payable",
        "function swapExactFluteForLute(uint256 tokenId) external payable",
        "event Swap(address indexed user, address indexed from, address indexed to, uint256 fromTokenId, uint256 toTokenId, uint256 fee)",
      ]),
    },
  },
  [ChainId.Mumbai]: {
    lute: {
      address: "0x2520269af2df06639998795920851876f63b5AB1",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
        "function setApprovalForAll(address operator, bool approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    flute: {
      address: "0x38e7D4621531E6d63eF3A817912b6f3a34610043",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
        "function setApprovalForAll(address operator, bool approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    luteDrop: {
      address: "0x5Cc18D3C2f1e03b037A89fc1Ac1E13BDE4a956d1",
      abi: new Interface([
        "function latestDrop() external view returns (uint256)",
        "function drops(uint256 dropId) external view returns (tuple(uint256 fee, uint256 craftableSupply, uint256 craftedSupply, uint256 craftsPerAddress))",
        "function crafts(address account, uint256 dropid) external view returns (uint256)",
        "function craft(uint8 item, uint256 dropid) external payable",
        "event Craft(address indexed to, uint8 indexed item, uint256 fee)",
      ]),
    },
    lutiswap: {
      address: "0x12d7F2D67440017c287Ae7F7a48a8f8508954e26",
      abi: new Interface([
        "function nextLute() external view returns (uint256)",
        "function nextFlute() external view returns (uint256)",
        "function latestSwapLuteForFlutePrice() external view returns (uint256)",
        "function latestSwapFluteForLutePrice() external view returns (uint256)",
        "function swapExactLuteForFlute(uint256 tokenId) external payable",
        "function swapExactFluteForLute(uint256 tokenId) external payable",
        "event Swap(address indexed user, address indexed from, address indexed to, uint256 fromTokenId, uint256 toTokenId, uint256 fee)",
      ]),
    },
  },
  [ChainId.Polygon]: {
    lute: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
        "function setApprovalForAll(address operator, bool approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    flute: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      abi: new Interface([
        "function totalSupply() external view returns (uint256)",
        "function tokenURI(uint256 tokenId) external view returns (string memory)",
        "function setApprovalForAll(address operator, bool approved) external",
        "function isApprovedForAll(address owner, address operator) external view returns (bool)",
        "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
        "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
      ]),
    },
    luteDrop: {
      address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      abi: new Interface([
        "function latestDrop() external view returns (uint256)",
        "function drops(uint256 dropId) external view returns (tuple(uint256 fee, uint256 craftableSupply, uint256 craftedSupply, uint256 craftsPerAddress))",
        "function crafts(address account, uint256 dropid) external view returns (uint256)",
        "function craft(uint8 item, uint256 dropid) external payable",
        "event Craft(address indexed to, uint8 indexed item, uint256 fee)",
      ]),
    },
    lutiswap: {
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      abi: new Interface([
        "function nextLute() external view returns (uint256)",
        "function nextFlute() external view returns (uint256)",
        "function latestSwapLuteForFlutePrice() external view returns (uint256)",
        "function latestSwapFluteForLutePrice() external view returns (uint256)",
        "function swapExactLuteForFlute(uint256 tokenId) external payable",
        "function swapExactFluteForLute(uint256 tokenId) external payable",
        "event Swap(address indexed user, address indexed from, address indexed to, uint256 fromTokenId, uint256 toTokenId, uint256 fee)",
      ]),
    },
  },
};

export const getConfig = (chainId: ChainId | undefined) => {
  switch (chainId) {
    case ChainId.Hardhat:
      return config[ChainId.Hardhat];
    case ChainId.Mumbai:
      return config[ChainId.Mumbai];
    case ChainId.Polygon:
      return config[ChainId.Polygon];
    default:
      return config[ChainId.Polygon];
  }
};

export default config;
