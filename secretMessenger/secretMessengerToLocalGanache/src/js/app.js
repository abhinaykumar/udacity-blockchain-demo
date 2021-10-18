App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Message.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var MessageArtifact = data;
      App.contracts.Message = TruffleContract(MessageArtifact);

      // Set the provider for our contract
      App.contracts.Message.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    const showAccount = document.querySelector(".showAccount");

    ethereumButton.addEventListener("click", () => {
      getAccount().then((account) => {
        $("#setMessageButton").click(function () {
          App.contracts.Message.deployed()
            .then(function (instance) {
              messageInstance = instance;
              message = $("#userInput").val();

              // Execute adopt as a transaction by sending account
              return messageInstance.setMessage(message, { from: account });
            })
            .then(function (result) {
              console.log(result);
            })
            .catch(function (err) {
              console.log(err.message);
            });
        });
      });
    });

    async function getAccount() {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      showAccount.innerHTML = account;
      // return only first account
      return account;
    }
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
