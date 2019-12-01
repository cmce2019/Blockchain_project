var Proyecto = artifacts.require("./ProyectoPredio.sol");
module.exports = function(deployer) {
  deployer.deploy(Proyecto);
};
