const SampleToken = artifacts.require("SampleToken");

module.exports = function (deployer) {
  deployer.deploy(SampleToken);
};

// var SampleToken = artifacts.require("SampleToken");

// module.exports = function (deployer) {
// below is the sample, if we want to pass initial values to our constructor
//   deployer.deploy(SampleToken, "UdacityExampleToken", "UET", 18, 1000);
// };
