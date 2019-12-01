pragma solidity ^0.5.1;

contract ProyectoPredio{
    
struct Propietario{
    bool creado;
    string nombre;
 }   
 struct Predio {
     bool creado;
     uint area;
     string direccion;
     uint numeropisos;
     string[] materiales;
    address propietario;
     bool conPropietario;
     }
 
 struct Transaccion{
     address destino;
     address origen;
 }
 

    mapping(address =>Predio) registroPredio;
    mapping (address => Propietario) registroPropietario;
    mapping (string => Transaccion) registroTransaccion;

     function registrarPredio(address predio, uint area, string memory direccion, uint numeropisos) public{
          registroPredio[predio].creado = true;
            registroPredio[predio].area = area;
             registroPredio[predio].direccion = direccion;
             registroPredio[predio].numeropisos = numeropisos;
             registroPredio[predio].conPropietario = false;
        }
     function registrarPropietario(string memory nombre, address direccion) public{
             Propietario memory propietario = Propietario(true,nombre);
            registroPropietario[direccion] = propietario;  //se registra un propietario
     }
     function registrarMaterial(address direccion, string memory nombrematerial) public{
         if(registroPredio[direccion].creado){ 
             registroPredio[direccion].materiales.push(nombrematerial);
         }else{
             revert();
         }
     }
     
     function obtenerMaterial(address direccion, uint index) public view returns (string memory material){
         if(registroPredio[direccion].creado && registroPredio[direccion].materiales.length>index){
             return(registroPredio[direccion].materiales[index]);
         }else{
             revert();
         }
     }
     
     function numeroDeMateriales(address direccion) public view returns (uint cantidad){
         if(registroPredio[direccion].creado){
             return (registroPredio[direccion].materiales.length);
         }else{
             revert();
         }
         
     }
     
     function registrarPropietarioAUnPredio (address predio, address propietario) public{
         if (registroPredio[predio].creado && !registroPredio[predio].conPropietario && registroPropietario[propietario].creado){
            registroPredio[predio].propietario=propietario;
            registroPredio[predio].conPropietario=true;
         }else{
             revert();
         }
     }
     
     function crearPisoEnUnPredio (address predio) public{
          if (registroPredio[predio].creado){
              registroPredio[predio].numeropisos++;
          }else{
              revert();
          }
     }
     
     function numeroDePisosDeUnPredio (address predio) public view returns (uint numeroDePisosDeUnPredio){
           if (registroPredio[predio].creado){
             return(registroPredio[predio].numeropisos);
          }else{
              revert();
          }
     }

    function nombrePropietario (address predio)public view returns (string memory nombre){
        if (registroPredio[predio].creado && registroPropietario[registroPredio[predio].propietario].creado && registroPredio[predio].conPropietario){
        return (registroPropietario[registroPredio[predio].propietario].nombre);
        }else{
            revert();
        }
    } 
    
    
   
     
     function transferirPredio (address origen, address destino, address predio, string memory fecha) public{
          if (registroPredio[predio].creado && registroPropietario[origen].creado && registroPropietario[destino].creado && registroPredio[predio].conPropietario)
     {
                    registroPredio[predio].propietario=destino;
                    Transaccion memory transaccion= Transaccion(origen,destino);
                    registroTransaccion[fecha]=transaccion;
     }else{
         revert();
     }
         
         
     }
     
 //0x5765Bd8a45Ec37C341dbe2e6EA3E9daf2Edac82C     0xfd1A0a12FC3160a72aA860a50884d9d57Ec97B38
}
 
 

        