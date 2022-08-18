require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
/** @type import('hardhat/config').HardhatUserConfig */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY;

module.exports = {
  //default one time spin up of local environment. 
  defaultNetwork: "hardhat",
  //set up below to deploy to actual testnet. while runnning deploy script use --network to specify network
  networks: {
    rinkeby: {      
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4      
    },
    //run command - 'npx hardhat node' to set up local node, similar to ganache setup
    //local hardhat setup automatically takes random existing account details. 
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337      
    }
  },
  solidity: "0.8.9",
  //API key is generated after login in to etherscan and is for a single account.
  etherscan: {
    apiKey: ETHERSCAN_APIKEY
  },
  //get report on how much gas used in terminal or in a file. utilised when running a tests.
  gasReporter: {
    enabled: true,
    //generate report to a file
    outputFile: "gas-report.txt",
    noColors: true    
    //optional- to get report in USD from live exchange rate, generate apikey from coinmarketcap website
    // curreny: "USD"
    // coinmarketcap: COINMARKETCAP_APIKEY
    //add which blockchain to deploy to, buy specifing here. 
    //token: "MATIC"
  }
};
