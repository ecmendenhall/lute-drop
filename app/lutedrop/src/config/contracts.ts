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
      address: "0xB465F0Fe841671583e57bBf002D7820CE94D00F5",
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
      address: "0xFDF502e5BA521038b12c3846406a55081CD791CC",
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
      address: "0x6F42fb0721FD95bdBC56110dB6B338bC4A057F0B",
      abi: new Interface([
        "function latestDrop() external view returns (uint256)",
        "function drops(uint256 dropId) external view returns (tuple(uint256 fee, uint256 craftableSupply, uint256 craftedSupply, uint256 craftsPerAddress))",
        "function crafts(address account, uint256 dropid) external view returns (uint256)",
        "function craft(uint8 item, uint256 dropid) external payable",
        "event Craft(address indexed to, uint8 indexed item, uint256 fee)",
      ]),
    },
    lutiswap: {
      address: "0x6B1ed9173e325dc2AffC4f3600baB04086cA7011",
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
      address: "0x0207Ec75c23D976827EaAC94eecc476d717e90Ac",
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
      address: "0xAd56DDB6226031D121A5590a29E39f333Ce734db",
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
      address: "0x34EA034312818003E38Ac30A5116B79FB0425447",
      abi: new Interface([
        "function latestDrop() external view returns (uint256)",
        "function drops(uint256 dropId) external view returns (tuple(uint256 fee, uint256 craftableSupply, uint256 craftedSupply, uint256 craftsPerAddress))",
        "function crafts(address account, uint256 dropid) external view returns (uint256)",
        "function craft(uint8 item, uint256 dropid) external payable",
        "event Craft(address indexed to, uint8 indexed item, uint256 fee)",
      ]),
    },
    lutiswap: {
      address: "0x9443575801BC4168064C63512d4f371924eB9811",
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
