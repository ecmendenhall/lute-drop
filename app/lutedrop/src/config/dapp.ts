import { ChainId, Config, MULTICALL_ADDRESSES } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: ChainId.Hardhat,
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
    [ChainId.Rinkeby]:
      "https://eth-rinkeby.alchemyapi.io/v2/",
  },
  multicallAddresses: {
    [ChainId.Hardhat]: "0x7bc06c482DEAd17c0e297aFbC32f6e63d3846650",
    ...MULTICALL_ADDRESSES,
  },
};

export default config;
