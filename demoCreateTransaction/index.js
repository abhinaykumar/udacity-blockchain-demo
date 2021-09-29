const Web3 = require("web3")
const EthereumTransaction = require("ethereumjs-tx").Transaction
const w3provider = 'https://rinkeby.infura.io/v3/xxxxx'
// connecting remote
const web3 = new Web3(new Web3.providers.HttpProvider(w3provider))

// connecting local ganache
// var web3 = new Web3('HTTP://127.0.0.1:8545')

const sendingAddress = '0x123xxxx'
const receivingAddress = '0x123xxxxx'

privateKeySender = '06xxxxxxx'

const privateKeySenderHex = Buffer.from(privateKeySender, 'hex')
web3.eth.getTransactionCount(sendingAddress).then((txcount) => {
  console.log(txcount)

  // for local Ganache
  // var rawTransaction = { nonce: txcount, to: receivingAddress, gasPrice: 20000000, gasLimit: 30000, value: 20000000, data: '0x' }
  var rawTransaction = {
    nonce: web3.utils.toHex(txcount + 2),
    to: receivingAddress,
    gasPrice: web3.utils.toHex(20000000 * 2), // 1 gwei
    gasLimit: web3.utils.toHex(6100500),
    value: 1000000000000000000,
    data: '0x00'
  }

  console.log(rawTransaction)

  const transaction = new EthereumTransaction(rawTransaction, { chain: 'rinkeby' })
  transaction.sign(privateKeySenderHex);

  console.log(transaction)

  const serializedTransaction = transaction.serialize()

  web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex')).on('receipt', console.log)
  console.log(serializedTransaction)
})
