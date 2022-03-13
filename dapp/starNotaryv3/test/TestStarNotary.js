// Importing the StartNotary Smart Contract ABI (JSON representation of the Smart Contract)
const StarNotary = artifacts.require("StarNotary");

var accounts; // List of development accounts provided by Truffle
var owner; // Global variable use it in the tests cases

// This called the StartNotary Smart contract and initialize it
contract("StarNotary", (accs) => {
  accounts = accs; // Assigning test accounts
  owner = accounts[0]; // Assigning the owner test account
});

it("can create a star", async () => {
  const tokenId = 1
  let instance = await StarNotary.deployed();
  await instance.createStar("aks", tokenId, { from: owner })
  assert.equal(await instance.tokenIdToStarInfo.call(tokenId), "aks");
})

it("lets user put up their star for sale", async () => {
  const user = accounts[1]
  const starId = 2
  const starPrice = web3.utils.toWei("0.01", "ether");
  let instance = await StarNotary.deployed();
  await instance.createStar("aks-1", starId, { from: user });
  await instance.putStarUpForSale(starId, starPrice, { from: user });
  assert.equal(await instance.starsForSale.call(starId), starPrice);
})

it("lets users buy a star", async () => {
  let instance = await StarNotary.deployed();

  const seller = accounts[1]
  const buyer = accounts[2]
  const starId = 3
  const starPrice = web3.utils.toWei(".001", "ether");
  let offerPrice = web3.utils.toWei(".005", "ether");
  const gasPrice = web3.utils.toWei(".0001", "ether");

  await instance.createStar("aks-2", starId, { from: seller });

  await instance.putStarUpForSale(starId, starPrice, { from: seller });

  await instance.approve(buyer, starId, { from: seller, gasPrice: gasPrice });

  const balanceOfSellerBeforeSell = await web3.eth.getBalance(seller);

  await instance.buyStar(starId, {
    from: buyer,
    value: offerPrice,
    gasPrice: gasPrice,
  });

  const balanceOfSellerAfterSell = await web3.eth.getBalance(seller);
  const value1 = Number(balanceOfSellerBeforeSell) + Number(starPrice);
  const value2 = Number(balanceOfSellerAfterSell);
  assert.equal(value1, value2);
})

// it("lets user2 buy a star and decreases its balance in ether", async () => {
//   let instance = await StarNotary.deployed();
//   let user1 = accounts[1];
//   let user2 = accounts[2];
//   let starId = 5;
//   let starPrice = web3.utils.toWei(".01", "ether");
//   let balance = web3.utils.toWei(".05", "ether");
//   await instance.createStar("awesome star", starId, { from: user1 });
//   await instance.putStarUpForSale(starId, starPrice, { from: user1 });
//   let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
//   const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
//   await instance.buyStar(starId, { from: user2, value: balance, gasPrice: 0 });
//   const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
//   let value =
//     Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
//   assert.equal(value, starPrice);
// });

// // Example test case, it will test if the contract is able to return the starName property
// // initialized in the contract constructor
// it("has correct name", async () => {
//   let instance = await StarNotary.deployed(); // Making sure the Smart Contract is deployed and getting the instance.
//   let starName = await instance.starName.call(); // Calling the starName property
//   assert.equal(starName, "New Star"); // Assert if the starName property was initialized correctly
// });

// it("can claim star", async () => {
//   let instance = await StarNotary.deployed();
//   // we can always pass a special object as the last argument to any function
//   // In this case we are passing {from: owner}, and this doesnt have to be part
//   // of function signature
//   await instance.claimStar({ from: owner });
//   assert.equal(await instance.starOwner.call(), owner);
// });

// it("can change ownership", async () => {
//   const secondOwner = accounts[1];
//   let instance = await StarNotary.deployed();
//   // we can always pass a special object as the last argument to any function
//   // In this case we are passing {from: owner}, and this doesnt have to be part
//   // of function signature
//   await instance.claimStar({ from: owner });
//   assert.equal(await instance.starOwner.call(), owner);

//   await instance.claimStar({ from: secondOwner });
//   // function call() is free and do not cost to read the value from the ETH blockchain
//   assert.equal(await instance.starOwner.call(), secondOwner);
// });

// it("can change the name of the star", async () => {
//   let instance = await StarNotary.deployed();

//   await instance.changeName("My Star", { from: owner });
//   let starName = await instance.starName.call();

//   assert.equal(starName, "My Star");
// });
