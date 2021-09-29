const Web3 = require("web3")
// const EthereumTransaction = require("ethereumjs-tx").Transaction
const w3provider = 'https://rinkeby.infura.io/v3/xxxxx'
// connecting remote
const web3 = new Web3(new Web3.providers.HttpProvider(w3provider))

// web3.eth.getGasPrice((_err, value) => console.log(value))

// web3.eth.getUncle(500, 0).then(console.log)


web3.eth.getBlockTransactionCount(9285407).then(console.log)
