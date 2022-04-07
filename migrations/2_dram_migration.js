const Dram = artifacts.require("Dram");

module.exports = function(deployer) {
  deployer.deploy(Dram, 'Dram', 'DRM', 10, 3);
};
