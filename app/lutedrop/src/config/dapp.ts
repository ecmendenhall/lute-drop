import { ChainId, Config, MULTICALL_ADDRESSES } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    ...MULTICALL_ADDRESSES,
  },
};

export default config;
