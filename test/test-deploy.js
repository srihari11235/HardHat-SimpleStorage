const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

//use command 'npx hardhat test' to run test
describe("SimpleStorage", function () {
  let simpleStorageFactory;
  let simpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve();
    const expetedValue = 0;

    assert.equal(currentValue.toString(), expetedValue);
  })

  it("Should update when we call store", async function() {
    const expectedValue = 7;
    const transcationResponse = await simpleStorage.store("7");
    await transcationResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();

    assert.equal(currentValue.toString(), expectedValue);
  });

});