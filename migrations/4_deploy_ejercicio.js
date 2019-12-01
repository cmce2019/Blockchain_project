var Ejercicio = artifacts.require("./Ejercicio.sol");
module.exports = function(deployer) {
  deployer.deploy(Ejercicio);
};
