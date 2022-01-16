import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import dotenv from "dotenv";
import { task } from "hardhat/config";
import { deployLocal, deployTestnet } from "./scripts/deploy";

dotenv.config();

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy:local", "Deploys contracts", async (args, hre) => {
  await deployLocal(hre.ethers);
});

task("deploy:testnet", "Deploys contracts", async (args, hre) => {
  await deployTestnet(hre.ethers);
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
      forking: {
        enabled: false,
        url: process.env.ALCHEMY_API_KEY,
      },
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: { mnemonic: process.env.ROPSTEN_MNEMONIC },
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts: { mnemonic: process.env.KOVAN_MNEMONIC },
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts: { mnemonic: process.env.RINKEBY_MNEMONIC },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
