var Estaciones = artifacts.require("./Estaciones.sol");
module.exports = function(deployer) {
  deployer.deploy(Estaciones);
};
