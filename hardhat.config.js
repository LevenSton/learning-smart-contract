require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const SEPOLIA_PRIVATE_KEY=process.env.SEPOLIA_PRIVATE_KEY
const SEPOLIA_RPC_URL=process.env.SEPOLIA_RPC_URL
const ETHERSCAN_API_KEY=process.env.ETHERSCAN_API_KEY

const GOERLI_PRIVATE_KEY=process.env.GOERLI_PRIVATE_KEY
const GOERLI_RPC_URL=process.env.GOERLI_RPC_URL
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
},
  solidity: "0.8.18",
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    }
  },
  mocha: {
    timeout: 500000,
  },
};