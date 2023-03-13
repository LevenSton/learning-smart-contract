require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const SEPOLIA_PRIVATE_KEY=process.env.SEPOLIA_PRIVATE_KEY
const SEPOLIA_RPC_URL=process.env.SEPOLIA_RPC_URL
const ETHSCAN_API_KEY=process.env.ETHSCAN_API_KEY
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  solidity: "0.8.18",
};
