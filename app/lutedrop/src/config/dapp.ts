import {
  ChainId,
  Config,
  Hardhat,
  Mumbai,
  Polygon,
  Rinkeby,
} from "@usedapp/core";

export const isSupportedChain = (chainId: ChainId | undefined) => {
  return !!chainId && SUPPORTED_CHAIN_IDS.includes(chainId);
};

const SUPPORTED_CHAIN_IDS = [
  ChainId.Hardhat,
  ChainId.Rinkeby,
  ChainId.Mumbai,
  ChainId.Polygon,
];

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
    [ChainId.Rinkeby]: "https://eth-rinkeby.alchemyapi.io/v2/",
    [ChainId.Mumbai]: "https://polygon-mumbai.g.alchemy.com/v2/",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  networks: [Hardhat, Rinkeby, Mumbai, Polygon],
};

export default config;
