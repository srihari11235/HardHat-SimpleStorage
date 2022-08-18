// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat");

async function main() {

  //ethers.getContractFactory is a wrapper by hardhat to get contract details. 
  //hardhat compile and stores information in artifact folder. Using this method allows hardhat to get compiled information. 
  //with plain ethersjs we had to manually take the abi, bin and create contract factory. Here, hardhat does it for us. 
  const simpleStorageFactory = await ethers.getContractFactory(
    "SimpleStorage"
  )

  console.log("deploying contract..");
  const simpleStorage = await simpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("deployed");

  //hardhat network - deployment happens to the hardhat network.
  //the default hardhat network has a predefined RPC url and private Key. [no need to specify them as was done with ethersjs]
  //npx run hardhat scripts/deploy.js --network hardhat [--network command can be used to specify the network to run the script]
  console.log(`Deployed contract ${simpleStorage.address}`);

  
  if(network.config.chainId === 4 && process.env.ETHERSCAN_APIKEY) {  
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is : ${currentValue}`); 

  const transactionResponse = await simpleStorage.store("7");
  await transactionResponse.wait(1); 

  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value: ${updatedValue}`);
}

//verify the deployed contract, through block explores like etherscan 
//this is a way of publishing your code to be viewed by whoever whats to use the contract.
// Gives the user to contract and he/she can make sure it is doing what is claimed. 
//Usually deployment just uploads bytecode to the blockchain. Verification is process by which the code is reverse engineered from the bytecode for users to see.
async function verify(contractAddress, args) {  
  console.log("Verifying Contract..");
  try {
    // run command is used to run --verify on hardhat. The block explorer (etherscan) details has been setup in hardhat.config.js
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    }); 
  } catch(e) {
    if(e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
