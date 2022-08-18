const { task } = require("hardhat/config"); 

//custom hardhat tasks. This can be run in command line, with npx hardhat block-number
task("block-number", "Prints the current block number")
    .setAction(
        async (taskArgs, hre) => {
            const blockNumber = await hre.ethers.provider.getBlockNumber();
            console.log(`Current block Number: ${blockNumber}`);
        }
    );