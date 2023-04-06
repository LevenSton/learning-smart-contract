const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    log("----------------------------------------------------")
    log("Deploying MyToken and waiting for confirmations...")
    const name = "MeMe Coin"
    const symbol = "Meme"
    const feeRation = 10
    const burnRatio = 5
    const myToken = await deploy("MyToken", {
        from: deployer,
        args: [name,symbol,feeRation,burnRatio],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`MyToken deployed at ${myToken.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("start verify...")
        await verify(myToken.address, [])
    }
}

module.exports.tags = ["all", "myToken"]