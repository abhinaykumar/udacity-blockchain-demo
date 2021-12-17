// const HDWalletProvider = require("truffle-hdwallet-provider");
// using version below leads to can not find module "pify"
const HDWalletProvider = require("@truffle/hdwallet-provider");
const seedPhrase =
  "sauce demand hawk borrow term lyrics term carry inform cycle rug predict";
const rinkebyInfuraEndpoint =
  "https://rinkeby.infura.io/v3/79b9792b896a42bdad7dfc7d73af8794";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    develop: {
      port: 8545,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: { phrase: seedPhrase },
          providerOrUrl: rinkebyInfuraEndpoint,
        }),
      network_id: 4, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
