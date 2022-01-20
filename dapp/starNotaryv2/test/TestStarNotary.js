// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

var accounts; // List of development accounts provided by Truffle
var owner; // Global variable use it in the tests cases

// This called the StartNotary Smart contract and initialize it
contract("StarNotary", (accs) => {
  accounts = accs; // Assigning test accounts
  owner = accounts[0]; // Assigning the owner test account
});

// Example test case, it will test if the contract is able to return the starName property
// initialized in the contract constructor
it("has correct name", async () => {
  let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
  let starName = await instance.starName.call(); // Calling the starName property
  assert.equal(starName, "New Star"); // Assert if the starName property was initialized correctly
});

it("can claim star", async () => {
  let instance = await StarNotary.deployed();
  // we can always pass a special object as the last argument to any function
  // In this case we are passing {from: owner}, and this doesnt have to be part
  // of function signature
  await instance.claimStar({from: owner})
  assert.equal(await instance.starOwner.call(), owner);
})

it("can change ownership", async () => {
  const secondOwner = accounts[1];
  let instance = await StarNotary.deployed();
  // we can always pass a special object as the last argument to any function
  // In this case we are passing {from: owner}, and this doesnt have to be part
  // of function signature
  await instance.claimStar({ from: owner });
  assert.equal(await instance.starOwner.call(), owner);

  await instance.claimStar({ from: secondOwner });
  assert.equal(await instance.starOwner.call(), secondOwner);
});

it("can change the name of the star", async () => {
  let instance = await StarNotary.deployed();

  await instance.changeName("My Star", {from: owner});
  let starName = await instance.starName.call();

  assert.equal(starName, "My Star");
});
