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
  readOnlyChainId: ChainId.Polygon,
  readOnlyUrls: {
    [ChainId.Polygon]:
      "https://polygon-mainnet.g.alchemy.com/v2/13eXkaOScVZ2s9rg5c4Hu2Tb3pPLc4In",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  },
  networks: [Hardhat, Rinkeby, Mumbai, Polygon],
};

export default config;
